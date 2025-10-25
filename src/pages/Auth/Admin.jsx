import  { useEffect, useState } from 'react'; 
import { db } from '../firebase'; 
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './admin.css'; 

import { Bar , Line} from 'react-chartjs-2'; // Importing both Bar and Line charts from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,    // Add this
  LineElement,     // Add this
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

// Register Chart.js modules
// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,   // Register PointElement
  LineElement,    // Register LineElement
  Title,
  Tooltip,
  Legend
);



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
  const [loading, setLoading] = useState(true);
 

 const [chartData, setChartData] = useState({
  labels: [],
  datasets: [{
    label: 'Order Status',
    data: [],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  }]
});


  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(orderCollection);
        const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
        setFilteredOrders(orderList);

           // Set chart data after fetching orders
           prepareChartData(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
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
    setEditData(order);  // Set the current order data for editing
    setEditModalOpen(true);  // Open the edit modal
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
  
      // Update the local state
      setOrders(orders.map(order => 
        order.id === editData.id ? { ...order, ...editData } : order
      ));
  
      setNotification('Order updated successfully!');
      setEditModalOpen(false);  // Close the modal
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

  // Order Status Data (e.g., Completed, Pending)
  const prepareChartData = (orderList) => {
    const statusCounts = orderList.reduce((acc, order) => {
      const { Status } = order;
      acc[Status] = (acc[Status] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(statusCounts), 
      datasets: [{
        label: 'Order Status',
        data: Object.values(statusCounts), 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
      }]
    });
  };



   // Sample Data for the Line Chart (existing)
   const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [400, 300, 200, 300, 450, 500],
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };


  return (
    <div className="dashboard">
      <header className="header">
        <h1 className='text-3xl font-bold ml-6'>Admin Panel</h1>
        <button className='border border-white py-2 px-4' onClick={exportToCSV}>Export to CSV</button>
      </header>
      <div className="main-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>Dashboard</li>
              <li><Link to='auth/users'>User</Link></li>
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
          {loading ? ( // Show loading indicator if data is being fetched
            // <div>Loading data, please wait...</div>
             <Spin />
          ) : (
          <div className="table-section">
            <h2>User Information</h2>         
           <table>
              <thead >
                <tr style={{ background: "#faf1d4" }}>
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
                     <button className='border border-amber-300 text-black bg-orange-100 px-3 py-2'  onClick={() => handleEdit(order)}>Edit</button>
                     <button className='border border-amber-300 text-black bg-orange-100 px-3 py-2'  onClick={() => handleDelete(order.id)}>Delete</button>
                   </td>
                 </tr>
               ))}
               
              </tbody>
            </table>
          </div>
          )}

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

          <div className="pagination bg-amber-300 my-5 p-2 ">

            {Array.from({ length: totalPages }, (_, index) => (
              <button className='border border-white text-white px-3 py-2 mx-2' 
              key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1} 
              </button>
            ))}
          </div>

          {editModalOpen && (
  <div className="modal">
    <h2>Edit Order</h2>
    <input 
      type="text" 
      value={editData.name || ''} 
      onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
      placeholder="Name"
    />
    <input 
      type="text" 
      value={editData.email || ''} 
      onChange={(e) => setEditData({ ...editData, email: e.target.value })} 
      placeholder="Email"
    />
    <input 
      type="number" 
      value={editData.totalPrice || ''} 
      onChange={(e) => setEditData({ ...editData, totalPrice: Number(e.target.value) })} 
      placeholder="Total Price"
    />
    <input 
      type="number" 
      value={editData.totalQuantity || ''} 
      onChange={(e) => setEditData({ ...editData, totalQuantity: Number(e.target.value) })} 
      placeholder="Total Quantity"
    />
    <select 
      value={editData.status || 'Pending'} 
      onChange={(e) => setEditData({ ...editData, status: e.target.value })} 
    >
      <option value="Pending">Pending</option>
      <option value="Shipped">Shipped</option>
      <option value="Completed">Completed</option>
    </select>
    <button className='bg-amber-500 p-2' onClick={handleSaveEdit}>Save</button>
    <button className='bg-red-500 p-2 ml-2' onClick={() => setEditModalOpen(false)}>Cancel</button>
  </div>
)}



           {/* Analytics Section */}
 <div className="analytics-section">

<h2>Analytics Overview</h2>
<div className="chart-container">
<div className="chart">
  <h2>Revenue Chart (Line)</h2>
  <Line data={lineData} />
</div>
  {/* Render Bar chart only when chartData is ready */}
  {chartData && chartData.labels.length > 0 ? (
  <div className='chart bg-orange-100'>
    <h2>Status Chart (Bar)</h2>
    <Bar 
    className='h-full'
      data={chartData}
      options={{
        responsive: true,
      }} 
    />
  </div>
  ) : (
    <p>Loading chart...</p>
  )}
</div>
</div>


        </main>
      </div>
    </div>
  );
};

export default Admin;
