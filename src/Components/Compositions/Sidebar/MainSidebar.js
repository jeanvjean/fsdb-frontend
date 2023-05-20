import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  ListItem,
  Span,
  Img,
  NextIcon,
  SidebarContent,
  SidebarHeader,
  SideBarContainer,
  IconDiv,
  Footer,
  H3,
  DarkMode,
} from './Styles';
import { adminSideBarRoute, akuPayDisburseUserRoutes, ROLES, repRoutes } from './sidebarData';
import SidebarProvider, { SidebarContext } from '../../../context/SidebarContext';
import { Logo, Switch } from '../../Elements';
import { useUser } from '../../../hooks/useUser';
import { Box } from 'rebass';
import { BurgerIcon, BurgerLines } from '../Header/Styles';

const MainSidebar = (props) => {
  const router = useHistory();
  const { state, dispatch } = useContext(SidebarContext);
  const [pageName, setPageName] = useState('');

  const [SIDEBARS, SETSIDEBARS] = useState([])
  const [clientWindowWidth, setClientWindowWidth] = useState('desktop')
  const [currRoute, setCurrRoute] = useState('')

  const allSubRoutes = [
    'audit-logs',
    'response-logs',
    'upload-error-logs',
    'flagged-transactions-approval',
    'beneficiary-upload-logs'
  ]

 
  const handleClickOnNavigationItem = (item) => {
    if(item.isBtn){
      const routes = [...SIDEBARS.map(s => {
        if(s.id == item.id){

          return {
            ...s,
            showSubRoutes: !item.showSubRoutes
          }
        }
        return s
      })]
      SETSIDEBARS(routes)

      return item
    }
    router.push(item.link);
  };

  const {user} = useUser()

  useEffect(() => {
    const { pathname } = router.location;
    const tabRoute = pathname.split('/').slice(0, 3).join('/');
    const route = tabRoute.split('/')[tabRoute.split('/').length - 1]
    setCurrRoute(route)
    setPageName(tabRoute);
  }, [props, router.location]);

  useEffect(() => {
    if(allSubRoutes.includes(currRoute)){
      const sidebars = SIDEBARS.map(s => {
        if(s.subRoutes && s.subRoutes.some(sub => sub.routeSlug === currRoute)){
          return {
            ...s,
            showSubRoutes: true
          }
        }
        return s
      })
      SETSIDEBARS([...sidebars])
    }
  }, [currRoute])

  useEffect(() => {

    switch (user.user_type) {
      case ROLES.ADMIN:
        SETSIDEBARS(adminSideBarRoute)
        break;

      case ROLES.REP:
        SETSIDEBARS(repRoutes)
        break;
               
      default:
        SETSIDEBARS(akuPayDisburseUserRoutes)        
        break;
    }

  }, [user.user_type]);  

  const getWidth = async (width) => {
    if(width >= 1200){
      dispatch({ type: 'OPEN_SIDEBAR' })
      await setClientWindowWidth('desktop')
    }

    if(width >= 800 && width < 1200){
      await setClientWindowWidth('medium')
    }

    if(width < 800){
      closeSidebar()
      await setClientWindowWidth('mobile')
    }  
  }

  useEffect(() => {
    window.addEventListener('resize', async () => {
      const width = document.body.clientWidth;
      getWidth(width)
    });
  }, [document.body.clientWidth]);

  useEffect(() => {
    getWidth(document.body.clientWidth)
  }, [])

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })

  return (
    <SidebarProvider>
      <SideBarContainer sidebarOpen={state.sidebarOpen} clientWindowWidth={clientWindowWidth}>
        <SidebarHeader>
          <Logo height={40} width={100} />
          {
            clientWindowWidth === 'mobile' && (
              <BurgerIcon onClick={toggleSidebar}>
                <BurgerLines />
                <BurgerLines />
                <BurgerLines />
              </BurgerIcon>
            )
          }
        </SidebarHeader>



        <SidebarContent>
          <ul>
              {
                (
                  SIDEBARS.map((item, i) => {
                    const {img:{src:Icon}} = item
                    return (
                      <>
                        <ListItem
                          key={i}
                          onClick={() => handleClickOnNavigationItem(item)}
                          active={pageName === item.link  && !item.isBtn ? 'active' : ''}
                        >
                          {/* <Img size="18px" mr="0.8rem" src={item.img.src} alt={item.img.alt} /> */}
                          <Icon style={{height:'20px', width:'20px', marginRight:'1rem'}}/>
                          <Span>{item.span}</Span>
                          <IconDiv active={pageName === item.link ? 'active' : ''}>
                            <NextIcon />
                          </IconDiv>
                        </ListItem>
                        <Box ml="2rem">
                          {
                            item?.showSubRoutes && item.subRoutes.map((r, j) => {
                              const {img:{src:SubIcon}} = item
                              return (
                                <ListItem
                                  key={j}
                                  onClick={() => handleClickOnNavigationItem(r)}
                                  active={pageName === r.link ? 'active' : ''}
                                >
                                  {/* <Img size="18px" mr="0.8rem" src={r.img.src} alt={r.img.alt} /> */}
                                  <SubIcon style={{height:'20px', width:'20px', marginRight:'1rem'}}/>
                                  <Span>{r.span}</Span>
                                  <IconDiv active={pageName === r.link ? 'active' : ''}>
                                    <NextIcon />
                                  </IconDiv>
                                </ListItem>                         
                              )
                            })
                          }                       
                        </Box>
                      </>
                    )
                  })
                )
              }            

          </ul>

          <Footer sidebarOpen={state.sidebarOpen}>
            {/* <H3>SETTINGS</H3> */}
            {/* <DarkMode>
              <span style={{ marginRight: '1rem' }}>Dark Mode</span>
              <Switch>
                <span>WIP</span>
              </Switch>
            </DarkMode> */}
          </Footer>
        </SidebarContent>
      </SideBarContainer>
    </SidebarProvider>
  );
};

export default MainSidebar;
