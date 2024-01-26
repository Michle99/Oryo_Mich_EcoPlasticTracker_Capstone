import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMapCoordinates } from "../redux/reportSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Box, Typography } from "@mui/material";
import GoogleMapContainer from "./GoogleMap";


const PollutionMap: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const reports = useSelector((state: RootState) => state.report.reports);

    useEffect(() => {
      // Fetch pollution reports when the component mounts
      dispatch(fetchMapCoordinates());
    }, [dispatch]);
    
    return (
        <Box>
            {reports.map((report) => (
                <div key={report._id}>
                    {report.location && report.location.coordinates && 
                        report.location.coordinates.length > 0 ? (
                      <GoogleMapContainer 
                        key={report._id}
                         coordinates={report.location.coordinates} 
                      />
                    ): (
                        <Typography key={report._id}>Cannot read properties of undefined Coordinates...</Typography>
                    )}
                </div>
            ))}
        </Box>
    )

};

export default PollutionMap;