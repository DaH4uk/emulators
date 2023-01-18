import React, {useState} from 'react'
import './App.css'
import {
    Box,
    Heading,
    Link,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    UnorderedList
} from "@chakra-ui/react";

function App() {
    return (
        <Box className="App">
            <Heading mb={4}>Эмуляторы прошивок роутеров</Heading>
            <Text fontSize='md' mb={4}>Пожалуйста выберите производителя:</Text>
            <Tabs variant='solid-rounded' colorScheme='gray'>
                <TabList gap={6}>
                    <Tab>D-Link</Tab>
                    <Tab>Tp-Link</Tab>
                    <Tab>Asus</Tab>
                    <Tab>Zyxel</Tab>
                    <Tab>Netgear</Tab>
                    <Tab>Upvel</Tab>
                    <Tab>Другие</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Heading as='h2' size='sm'>D-Link</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/d-link/orange/emulators/dir615_revE/510/login.htm">
                                    D-Link оранжевая прошивка - ENG
                                </Link>
                                <Link ml={2} target="_blank"
                                      href="/routers/d-link/orange/emulators/dir615_revE/510/login.htm?manual=true">
                                    (режим мануала)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/d-link/gray/em.dlink.ru/emul/DIR-615DP1_gray/">
                                    D-Link серая прошивка (ENG)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/d-link/white/em.dlink.ru/emul/DIR-615DP1/index.html">
                                    D-Link белая прошивка
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>
                    <TabPanel>
                        <Heading as='h2' size='sm'>Tp-Link</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/tp-link/eng/index.html">
                                    TP-Link зеленая прошивка (ENG)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/tp-link/rus/Index.html">
                                    TP-Link зеленая прошивка (RUS)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/tp-link/archer/AC3200V1/index.htm">
                                    TP-Link Archer (ENG)
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>
                    <TabPanel>
                        <Heading as='h2' size='sm'>Asus</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/asus/rt-n16/index.html">
                                    Asus Синяя (Eng)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/asus/grey/RU/index.html">
                                    Asus серая прошивка (EN/RUS)
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>
                    <TabPanel>
                        <Heading as='h2' size='sm'>Zyxel</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/zyxel/nbg334w360ams2/rpSys.html">
                                    Zyxel синяя прошивка (Eng)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/zyxel/Keenetic/status.html">
                                    Zyxel Keenetic
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>
                    <TabPanel>
                        <Heading as='h2' size='sm'>Netgear</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/netgear/RUS/old/gui.netgear.ru/admin/JWNR2000/cgi-bin/index.html">
                                    Netgear (RUS) старая
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/netgear/RUS/new/html/index_basic.htm">
                                    Netgear (RUS) новая
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>

                    <TabPanel>
                        <Heading as='h2' size='sm'>Upvel</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/upvel/UR-314AWN/index.htm">
                                    Upvel UR-314AWN
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank"
                                      href="/routers/upvel/UR-447N4G/home.htm">
                                    Upvel UR-447N4G
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>

                    <TabPanel>
                        <Heading as='h2' size='sm'>Другие</Heading>
                        <UnorderedList mt={2}>
                            <ListItem>
                                <Link target="_blank" href="/routers/linksys/WRT54GL/4.30.0/Status.htm">
                                    Linksys
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/dd-wrt/demo/index.html">
                                    DD-WRT
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/belkin/index.html">
                                    Belkin
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/mikrotik/index.html">
                                    Mikrotik
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/sercomm/index.html">
                                    Sercomm S1010
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank"
                                      href="/routers/netis/www.netisru.com/en/Support/NETIS_Emulators/overseas/index.htm">
                                    Netis
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link target="_blank" href="/routers/zte/index.html">
                                    Zte v1.0
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default App
