import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMapCoordinates } from "../redux/reportSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Typography } from "@mui/material";
import GoogleMapContainer from "./GoogleMap";

/**
 * TODO: Represent coordinates as data points
 * @returns GoogleMapContainer with coordinates
 */

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
    <>
      {coordinates.length > 0 ? (
        <GoogleMapContainer coordinates={coordinates} />
      ) : (
        <Typography variant="body2">No coordinates available.</Typography>
      )}
    </>
  )
};

export default PollutionMap;