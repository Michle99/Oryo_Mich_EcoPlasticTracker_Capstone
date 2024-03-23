import { Request, Response } from 'express';
import PollutionReportModel, { IPollutionReport } from '../models/pollution-report.model';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Extend Request with user property
interface ExtendedRequest extends Request {
  user?: {
    id: string
  }
}

// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploads
    cb(null, path.join(__dirname, '../uploads/')); 
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Use the original filename with a unique suffix
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});
export const upload = multer({ storage });

// Controller function to handle submission of pollution reports
export const submitPollutionReport = async (
  req: ExtendedRequest, 
  res: Response
  ): Promise<void> => {
  try {
    // Extract report data from the request body
    const { 
      location, 
      title, 
      description, 
      type, 
      longitude, 
      latitude 
    } = req.body;

    // Ensure req.files is an array and not null or undefined
    // const files: Express.Multer.File[] = Array.isArray(req.files) ? req.files : [];
    // Ensure coordinates are provided
    if (!longitude || !latitude) {
      throw new Error(
        'Location coordinates (longitude and latitude) are required.'
      );
    }

    // Construct location.coordinates
    const locationCoordinates: number[] = [longitude, latitude];

    // Ensure req.files exists before accessing it to prevent errors
    if (!req.files) {
      // Handle the case where no images are present
      throw new Error('No images were uploaded.'); 
    }

    // Handle potential issues with req.files being an empty array
    if (!Array.isArray(req.files) || req.files.length === 0) {
      // Handle the case of empty files array
      throw new Error('No images were uploaded.'); 
    }
    
    // Extract uploaded images from the request (multer already handles them in req.files)
    const images: string[] = await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
      // Ensure the callback is async and uses await
      async function constructImageUrl() {
        return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      }
      // Call the async function to construct URL
      const imageUrl = await constructImageUrl(); 
      return imageUrl;
    }));

    // Create a new pollution report object
    const newReport: IPollutionReport = new PollutionReportModel({
      location: {
        coordinates: locationCoordinates
      },
      title,
      description,
      type,
      images,
      user: req.user?.id
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    // Send a success response with the saved report
    res.status(201).json(savedReport);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error submitting pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPollutionReports = async (
  req: ExtendedRequest, 
  res: Response
  ): Promise<void> => {
  try {
    // Retrieve all pollution reports from the database
    const reports = await PollutionReportModel.find({ user: req.user?.id });

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching pollution reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get location coordinates from reports
export const getLocationCoordinates = async (
  req: Request, 
  res: Response
  ): Promise<void> => {
  try {
    const reports = await PollutionReportModel.find({}, 'location');
    const coordinates = reports.map((report) => report.location.coordinates);
    res.json(coordinates);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

export const updatePollutionReport = async (
  req: ExtendedRequest, 
  res: Response
  ): Promise<void> => {
  try {
    const reportId = req.params.id;
    const updateData: IPollutionReport = req.body;

    // Check if the pollution report with the specified ID exists
    const existingReport = await PollutionReportModel.findById({ 
      _id: reportId
    });

    // Find the pollution report by ID and update it
    const updatedReport = await PollutionReportModel.findByIdAndUpdate(
      { _id: reportId }, 
      updateData, 
      { new: true }
    );

    if (!updatedReport) {
      if (req.user?.id) { // Check if user is logged in
        res.status(401).json({ error: 'Unauthorized: You can only update reports you submitted.' });
      } else {
        res.status(404).json({ error: 'Pollution report not found' });
      }
      return;
    }

    res.status(200).json({ 
      message: 'Pollution report updated successfully', 
      report: updatedReport 
    });
  } catch (error) {
    console.error('Error updating pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deletePollutionReport = async (
  req: ExtendedRequest, 
  res: Response
  ): Promise<void> => {
  try {
    const reportId = req.params.id;

    // Check if the pollution report with the specified ID exists
    const existingReport = await PollutionReportModel.findById({ 
      _id: reportId, user: req.user?.id 
    });

    if (!existingReport) {
      res.status(404).json({ error: 'Pollution report not found' });
      return;
    }

    // Find the pollution report by ID and remove it
    const deletedReport = await PollutionReportModel.findByIdAndDelete({ 
      _id: reportId, user: req.user?.id 
    });

    if (!deletedReport) {
      res.status(404).json({ error: 'Pollution report not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Pollution report deleted successfully', 
      report: deletedReport 
    });
  } catch (error) {
    console.error('Error deleting pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};