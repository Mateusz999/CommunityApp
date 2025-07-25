import { type SyntheticEvent, useEffect, useState } from "react";

import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { useProfile } from "../../../lib/Hooks/useProfile";
import {
  Box,
  Grid2,
  Tabs,
  Tab,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function ProfileActivities() {
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useParams();
  const { userActivities, setFilter, loadingUserActivities } = useProfile(id);
  useEffect(() => {
    setFilter("future");
  }, [setFilter]);
  const tabs = [
    { menuItem: "Nadchodzące", key: "future" },
    { menuItem: "Przeszłe", key: "past" },
    { menuItem: "Organizowane", key: "hosting" },
  ];
  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setFilter(tabs[newValue].key);
  };
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabs.map((tab, index) => (
              <Tab label={tab.menuItem} key={index} />
            ))}
          </Tabs>
        </Grid2>
      </Grid2>
      {(!userActivities || userActivities.length === 0) &&
      !loadingUserActivities ? (
        <Typography mt={2}>No activities to show</Typography>
      ) : null}
      <Grid2
        container
        spacing={2}
        sx={{ marginTop: 2, height: 400, overflow: "auto" }}
      >
        {userActivities &&
          userActivities.map((activity: Activity) => (
            <Grid2 size={2} key={activity.id}>
              <Link
                to={`/activities/${activity.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card elevation={4}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={`/images/categoryImages/${activity.category}.jpg`}
                    alt={activity.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" textAlign="center" mb={1}>
                      {activity.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      display="flex"
                      flexDirection="column"
                    >
                      <span>{format(activity.date, "do LLL yyyy")}</span>
                      <span>{format(activity.date, "h:mm a")}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
}
