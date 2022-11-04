import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import moment from "moment";
import xieLogo from "./XIE.png";

function App() {
  const [data, setData] = useState({
    feed: [],
    fetched: false,
    name: "",
    id: -1,
  });

  const THINGSPEAK_API = process.env.REACT_APP_THINGSPEAK_API;

  fetch(
    THINGSPEAK_API 
  )
    .then((res) => res.json())
    .then((json) =>
      setData({
        feed: json.feeds,
        fetched: true,
        name: json.channel.name,
        id: json.channel.id,
      })
    );

  if (data.fetched)
    return (
      <div className="App">
        <Box backgroundColor="#ff980087">
          <Box
            display="flex"
            justifyContent="space-around"
            margin="auto"
            paddingTop="2rem"
          >
            <Box paddingTop="2rem">
              <Typography variant="h5">
                Welcome, <strong>{data.name}!</strong>
              </Typography>
            </Box>
            <Box marginLeft={-10}>
              <img src={xieLogo} alt="xie-logo" height="120px" width="600px" />
            </Box>
            <Box paddingTop="2rem">
              <Typography variant="h5">
                User ID is <strong>{data.id}</strong>
              </Typography>
            </Box>
          </Box>
          <Box backgroundColor="#E0AE54" width="65%" margin="3rem auto">
            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="body">
                          <strong>Date and Time of Last Entry</strong>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body">
                          <strong>Value from MQ2 Gas Sensor</strong>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body">
                          <strong>Status</strong>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.feed
                      .slice(0)
                      .reverse()
                      .map((i) => (
                        <TableRow
                          key={i.entry_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {moment(i.created_at).format("LLLL")}
                          </TableCell>
                          <TableCell align="center">{i.field1}</TableCell>
                          {parseInt(i.field1) < 50 ? (
                            <TableCell align="center">
                              <Typography>Good</Typography>
                            </TableCell>
                          ) : (
                            <TableCell align="center">
                              <Typography>Bad</Typography>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </div>
    );

  return (
    <div className="App">
      <h4>No response</h4>
    </div>
  );
}

export default App;
