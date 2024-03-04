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
import { getPermissionsObj } from "../../../../util/auth";
import { BASE_URL } from "../../../../util/http";



export default function DesignSettings() {

    const permissions= getPermissionsObj();

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
          const response = await fetch(BASE_URL+'/groups');
          
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
          const response = await fetch(BASE_URL+'/categories');
          
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
          const response = await fetch(BASE_URL+'/styles');
          
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
          const response = await fetch(BASE_URL+'/products');
          
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
          const response = await fetch(BASE_URL+'/models');
          
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
          const response = await fetch(BASE_URL+'/sizes');
          
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
          const response = await fetch(BASE_URL+'/workers');
          
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
          const response = await fetch(BASE_URL+'/types');
          
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
          const response = await fetch(BASE_URL+'/stonegroups');
          
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

  
    const items = [
      {
        label: 'Group',
        key: 'group',
        style: {fontSize: '18px'}
      },
      {
        label: 'Category',
        key: 'category',
        style: {fontSize: '18px'}
      },
      {
        label: 'Style',
        key: 'style',
        style: {fontSize: '18px'}
      },
      {
        label: 'Product',
        key: 'product',
        style: {fontSize: '18px'}
      },
      {
        label: 'Model',
        key: 'model',
        style: {fontSize: '18px'}
      },
      {
        label: 'Size',
        key: 'size',
        style: {fontSize: '18px'}
      },
      {
        label: 'Worker',
        key: 'worker',
        style: {fontSize: '18px'}
      },
      {
        label: 'Type',
        key: 'type',
        style: {fontSize: '18px'}
      },
      {
        label: 'Stone Group',
        key: 'stoneGroup',
        style: {fontSize: '18px'}
      }
  ]


  const tabHandler= (tab) => {
    setselectedTab(tab.key);
  };

  return (
    <div className={classes.settings}>

        <Menu mode="horizontal" defaultSelectedKeys={['group']} onClick={tabHandler} items={items} className={classes.menuBar}>
        </Menu>

        <div>
          <Button 
            onClick={handleOpenModal} 
            className={classes.button}
            disabled= {permissions && !permissions.features.Settings.edit}
          >
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