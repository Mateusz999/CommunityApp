import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid2 } from "@mui/material";

type Props = {
    activity: Activity
}

export default function ActivityDetailsSidebar({activity}: Props) {
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
                    {activity.attendees.length} osoby wezmą udział
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                {activity.attendees.map(attendee => (
                <Grid2 key={attendee.id} container alignItems="center">
                    <Grid2 size={8}>
                        <List sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        alt={attendee.displayName}
                                        src={attendee.imageUrl}
                                        sx={{ width: 75, height: 75, mr:2}}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h6">{attendee.displayName}</Typography>
                             {attendee.following && (
                            <Typography variant="body2" color="orange">
                                Obserwujesz
                            </Typography>
                                 )}
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid2>
                    <Grid2 size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        {activity.hostId  === attendee.id && (
                            <Chip
                                label="Organizator"
                                color="warning"
                                variant='filled'
                                sx={{borderRadius: 2}}
                            />
                        )}

                    </Grid2>
                </Grid2>
                ))}
                
            </Paper>
        </>
    );
}

