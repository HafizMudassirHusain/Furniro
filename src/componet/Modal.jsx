import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import {auth} from '../pages/firebase';

function Modals({showModal,
   handleOk,
    handleCancel,
    isModalOpen, checkOutOrder}){

      useEffect(() => {
        return setcontinueAsaGuets(false);
      }, []); 

  const isLogin = auth.currentUser;
  console.log(isLogin)
   const [continueAsaGuets, setcontinueAsaGuets] = useState(false)

  return (
    <>
      <Modal className='w-1/2 h-102 block'
      width={"50%"} height={"80vh"}
       onClick={showModal} 
       title="Plz Proceed to continue"
        open={isModalOpen}
         onOk={handleOk}
       onCancel={handleCancel}
       footer={false}>
        {
          !isLogin  && !continueAsaGuets &&(
        <div className='flex flex-col  m-4 p-1'>
            <p className=' p-2'>plz signUp first to save your history</p>
        <Button >Continue with Google</Button>
        <p className='text-center m-4'>-------OR-------</p>
        <Button onClick={()=> setcontinueAsaGuets(true)} >Continue as a Guest</Button>
        </div> 
          )
        }


        { !isLogin &&
        continueAsaGuets && (
<Form layout='vertical' onFinish={checkOutOrder}>

  <Form.Item label={"Name"} name={"name"}>
    <Input></Input>
  </Form.Item>

  <Form.Item label={"Email"} name={"email"}>
    <Input></Input>
  </Form.Item>

  <Form.Item label={"Phone Number"} name={"number"}>
    <Input></Input>
  </Form.Item>

  <Form.Item label={"Address"} name={"address"}>
    <Input></Input>
  </Form.Item>

  <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
  </Form.Item>

</Form>
        )
        }

      </Modal>


    </>
  );
};

export default Modals;