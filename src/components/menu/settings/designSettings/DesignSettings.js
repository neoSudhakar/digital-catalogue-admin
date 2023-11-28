import classes from "../Settings.module.css";
import Group from "./Group";
import Category from "./Category";
import Style from "./Style";
import Product from "./Product";
import Model from "./Model";
import Size from "./Size";
import Worker from "./Worker";
import Type from "./Type";
import StoneGroup from "./StoneGroup";
import GroupTable from "./GroupTable";
import CategoryTable from "./CategoryTable";
import StyleTable from "./StyleTable";
import ProductTable from "./ProductTable";
import ModelTable from "./ModelTable";
import SizeTable from "./SizeTable";
import WorkerTable from "./WorkerTable";
import TypeTable from "./TypeTable";
import StoneGroupTable from "./StoneGroupTable";

import { Menu, Modal,Button } from "antd";
import { useEffect, useState } from "react";



export default function DesignSettings() {

    const [selectedTab, setselectedTab] = useState('group');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [groupData, setGroupData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [styleData, setStyleData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [sizeData, setSizeData] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [stoneGroupData, setStoneGroupData] = useState([]);

    const fetchGroupData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/groups');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setGroupData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const fetchCategoryData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/categories');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setCategoryData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchStyleData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/styles');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setStyleData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchProductData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/products');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setProductData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchModelData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/models');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setModelData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchSizeData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/sizes');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setSizeData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchWorkerData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/workers');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setWorkerData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchTypeData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/types');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setTypeData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchStoneGroupData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/stonegroups');
          
          if (response.status === 204) {
           
          } 
          else if(response.status === 200){
            const data = await response.json();
            //console.log(data);
            setStoneGroupData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    useEffect(() =>{
        fetchGroupData();
        fetchCategoryData();
        fetchModelData();
        fetchProductData();
        fetchSizeData();
        fetchStoneGroupData();
        fetchStyleData();
        fetchTypeData();
        fetchWorkerData();
    },[]);

    function handleOpenModal() {
        setIsModalOpen(true);
    };

    function handleCloseModal() {
        setIsModalOpen(false);
    };

  const tabHandler= (tab) => {
    setselectedTab(tab);
  };

  return (
    <div className={classes.settings}>

        <Menu mode="horizontal" defaultSelectedKeys={['group']} className={classes.menuBar}>
            <Menu.Item key="group" onClick={tabHandler.bind(this, 'group')} className={classes.menuItem}>
            Group
            </Menu.Item>
            <Menu.Item key="category" onClick={tabHandler.bind(this, 'category')} className={classes.menuItem}>
            Category
            </Menu.Item>
            <Menu.Item key="style" onClick={tabHandler.bind(this, 'style')} className={classes.menuItem}>
            Style
            </Menu.Item>
            <Menu.Item key="product" onClick={tabHandler.bind(this, 'product')} className={classes.menuItem}>
            Product
            </Menu.Item>
            <Menu.Item key="model" onClick={tabHandler.bind(this, 'model')} className={classes.menuItem}>
            Model
            </Menu.Item>
            <Menu.Item key="size" onClick={tabHandler.bind(this, 'size')} className={classes.menuItem}>
            Size
            </Menu.Item>
            <Menu.Item key="worker" onClick={tabHandler.bind(this, 'worker')} className={classes.menuItem}>
            Worker
            </Menu.Item>
            <Menu.Item key="type" onClick={tabHandler.bind(this, 'type')} className={classes.menuItem}>
            Type
            </Menu.Item>
            <Menu.Item key="stoneGroup" onClick={tabHandler.bind(this, 'stoneGroup')} className={classes.menuItem}>
            Stone Group
            </Menu.Item>

        </Menu>

        <div>
          <Button onClick={handleOpenModal} className={classes.button}>
            {`Add ${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}`}
          </Button>

          {(selectedTab === 'group' ? <GroupTable key={groupData} data={groupData}/>:
           (selectedTab === 'category' ? <CategoryTable key={categoryData} data={categoryData}/>:
            (selectedTab === 'style' ? <StyleTable key={styleData} data={styleData}/>:
             (selectedTab === 'product' ? <ProductTable key={productData} data={productData}/>:
              (selectedTab === 'model' ? <ModelTable key={modelData} data={modelData}/>:
              (selectedTab === 'size' ? <SizeTable key={sizeData} data={sizeData}/>:
               (selectedTab === 'worker' ? <WorkerTable key={workerData} data={workerData}/>:
                (selectedTab === 'type' ? <TypeTable key={typeData} data={typeData}/>:
                    <StoneGroupTable key={stoneGroupData} data={stoneGroupData}/>)))))))
          )}
          
          <Modal
            //title={isUpdateMode ? `UPDATE ${selectedTab.toUpperCase()}` : `ADD ${selectedTab.toUpperCase()}`}
            title={ `ADD ${selectedTab.toUpperCase()}`}
            open={isModalOpen}
            onCancel={handleCloseModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
            destroyOnClose
          >
            {(selectedTab === 'group' ? <Group refetchData={fetchGroupData} closeModal={handleCloseModal}/>:
                (selectedTab === 'category' ? <Category refetchData={fetchCategoryData} closeModal={handleCloseModal} />:
                 (selectedTab === 'style' ? <Style refetchData={fetchStyleData} closeModal={handleCloseModal}/>:
                  (selectedTab === 'product' ? <Product refetchData={fetchProductData} closeModal={handleCloseModal}/>:
                   (selectedTab === 'model' ? <Model refetchData={fetchModelData} closeModal={handleCloseModal}/>:
                    (selectedTab === 'size' ? <Size refetchData={fetchSizeData} closeModal={handleCloseModal}/>:
                     (selectedTab === 'worker' ? <Worker refetchData={fetchWorkerData} closeModal={handleCloseModal}/>:
                      (selectedTab === 'type' ? <Type refetchData={fetchTypeData} closeModal={handleCloseModal}/>:
                      <StoneGroup refetchData={fetchStoneGroupData} closeModal={handleCloseModal}/>)))))))
            )}
          </Modal>
        
      </div>
    </div>
  );

};