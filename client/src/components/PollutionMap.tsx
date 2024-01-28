import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMapCoordinates } from "../redux/reportSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Box } from "@mui/material";
import GoogleMapContainer from "./GoogleMap";


const PollutionMap: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const reports = useSelector((state: RootState) => state.report.reports);

  useEffect(() => {
    // Fetch pollution reports when the component mounts
    dispatch(fetchMapCoordinates())
    .then((response) => {
      setCoordinates(response.payload || []);
    });
  }, [dispatch]);
    
  console.log("Display reports from state:", reports[0]);
  
  return (
    <Box>
      {coordinates.map((coordinate, index) => (
        <Box key={index}>
          <GoogleMapContainer  coordinates={coordinate}/>
        </Box>
      ))}
    </Box>
  )
};

export default PollutionMap;