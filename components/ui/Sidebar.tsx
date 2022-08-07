import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxIcon from '@mui/icons-material/Inbox';
import EmailIcon from '@mui/icons-material/Email';

const menuItems = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
    return (
        <Drawer anchor="left" open={true} onClose={() => console.log('cerrando')}>
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">
                        Menú
                    </Typography>
                </Box>
                <List>
                    {menuItems.map((text, i) => (
                        <ListItem key={text} button>
                            <ListItemIcon>
                                {i % 2 ? <InboxIcon /> : <EmailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text}></ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {menuItems.map((text, i) => (
                        <ListItem key={text} button>
                            <ListItemIcon>
                                {i % 2 ? <InboxIcon /> : <EmailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Drawer>
    )
}
