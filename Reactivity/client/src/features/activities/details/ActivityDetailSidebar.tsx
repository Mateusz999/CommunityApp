import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid2 } from "@mui/material";

export default function ActivityDetailsSidebar() {
    const following = true;
    const isHost = true;
    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    2 osoby wezmą udział
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                <Grid2 container alignItems="center">
                    <Grid2 size={8}>
                        <List sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={'attendee name'}
                                        src={'/assets/user.png'}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h6">Bob</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid2>
                    <Grid2 size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        {isHost && (
                            <Chip
                                label="Organizator"
                                color="warning"
                                variant='filled'
                                sx={{borderRadius: 2}}
                            />
                        )}
                        {following && (
                            <Typography variant="body2" color="orange">
                                Obserwujesz
                            </Typography>
                        )}
                    </Grid2>
                </Grid2>
            </Paper>
        </>
    );
}

