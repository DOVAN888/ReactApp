//import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import sidebarBg from '../../assets/bg1.jpg'
import { DiReact } from "react-icons/di";
import {MdDashboard} from "react-icons/md"
import './SideBar.scss';
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';


const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props
    return (
        <>
               <ProSidebar
      image={image ? sidebarBg : false}
     
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
                    >
                        <DiReact  size={'3em'} color={"00bfff"}/>
         <span>Van tuong</span> 
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<MdDashboard />}
          >
                Dashboard
                <Link to="/admins"/>
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
                            icon={<FaGem />}
                            title="Features"
          >
            <MenuItem> ユーザー管理 <Link to="/admins/manage-users"/></MenuItem>
            <MenuItem> Quiz 管理</MenuItem>
            <MenuItem> Question 管理</MenuItem>
          </SubMenu>
          
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> Van Tuong</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  
        </>
    )
    
}

export default  SideBar