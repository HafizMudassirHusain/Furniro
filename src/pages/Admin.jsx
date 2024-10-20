import React, { useEffect, useState } from 'react'; 
import { db } from './firebase'; // Adjust the import based on your Firebase setup
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './admin.css'; // Import the CSS file for styling

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('totalPrice');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [editData, setEditData] = useState({});


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(orderCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
        setFilteredOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order => 
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField === 'totalPrice') return a.totalPrice - b.totalPrice;
      if (sortField === 'totalQuantity') return a.totalQuantity - b.totalQuantity;
      return 0;
    });

    setFilteredOrders(sorted);
    setCurrentPage(1);
  }, [searchTerm, sortField, orders]);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = async (orderId) => {
    await deleteDoc(doc(db, 'orders', orderId));
    setOrders(orders.filter(order => order.id !== orderId));
    setNotification('Order deleted successfully!');
  };

  const handleEdit = (order) => {
    setEditData(order);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const orderRef = doc(db, 'orders', editData.id);
      await updateDoc(orderRef, {
        name: editData.name,
        email: editData.email,
        totalPrice: editData.totalPrice,
        totalQuantity: editData.totalQuantity,
        status: editData.status,
      });
      setOrders(orders.map(order => (order.id === editData.id ? { ...order, ...editData } : order)));
      setNotification('Order updated successfully!');
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating order:", error);
      setNotification('Failed to update order.');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { Status: newStatus });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, Status: newStatus } : order
      ));
      setNotification(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      setNotification('Failed to update status.');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Total Price', 'Total Quantity', 'Time', 'Status'],
      ...filteredOrders.map(order => [order.id, order.name, order.email, order.totalPrice, order.totalQuantity, order.time, order.status])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Admin Panel</h1>
        <button onClick={exportToCSV}>Export to CSV</button>
      </header>
      <div className="main-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Users</li>
              <li>Settings</li>
              <li>Reports</li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          {notification && <div className="notification">{notification}</div>}
          <div className="search-section">
            <input 
              type="text" 
              placeholder="Search by name or email" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
              <option value="totalPrice">Sort by Total Price</option>
              <option value="totalQuantity">Sort by Total Quantity</option>
            </select>
          </div>

          <div className="table-section">
            <h2>User Information</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Price</th>
                  <th>Total Quantity</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map(order => (
                  <tr key={order.id} onClick={() => handleRowClick(order)}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.totalQuantity}</td>
                    <td>{order.time}</td>
                    <td>
                      <select 
                        value={order.Status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button className='bg-amber-500 p-2' onClick={() => handleEdit(order)}>Edit</button>
                      <button className='bg-red-400 p-2 ml-2' onClick={() => handleDelete(order.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedOrder && (
            <div className="table-section">
              <h2>Item List for {selectedOrder.name}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map(item => (
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td>
                        <img src={item.image} alt={item.title} style={{ width: '50px' }} />
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>

          {editModalOpen && (
            <div className="modal">
              <h2>Edit Order</h2>
              <input 
                type="text" 
                value={editData.name} 
                onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
                placeholder="Name"
              />
              <input 
                type="text" 
                value={editData.email} 
                onChange={(e) => setEditData({ ...editData, email: e.target.value })} 
                placeholder="Email"
              />
              <select 
                value={editData.Status} 
                onChange={(e) => setEditData({ ...editData, Status: e.target.value })} 
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
              </select>
              <button className='bg-amber-500 p-2' onClick={handleSaveEdit}>Save</button>
              <button className='bg-red-500 p-2 ml-2' onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;









// UI Enhancements
// Responsive Design:

// Ensure the layout is responsive across all devices. Use CSS Grid or Flexbox to manage layout efficiently.
// Color Scheme and Typography:

// Use a consistent color scheme and typography to create a more visually appealing UI. Consider using a UI framework like Bootstrap or Material-UI for pre-designed components.
// Hover Effects and Animations:

// Add subtle hover effects on buttons and tables for better interactivity.
// Use CSS animations for showing and hiding elements to create a smoother transition.
// Card Layout for User Info:

// Instead of a traditional table for user information, consider using cards. Each card can display user details with a more modern look.
// Item Details as Accordions:

// For item details, use accordion components that expand when a user clicks on a specific order. This can save space and provide a cleaner interface.
// Tooltips:

// Implement tooltips on icons or buttons to provide additional information without cluttering the UI.
// Icons and Imagery:

// Use icons to represent actions (edit, delete) and enhance visual appeal. This helps in creating a more intuitive user experience.
// Dashboard Analytics:

// Consider adding a dashboard section with analytics, such as total sales, number of users, and order trends. This can be represented with charts (using libraries like Chart.js or D3.js).
// User Role Management:

// If applicable, implement user role management where different admins have different access levels (e.g., view only, edit).
