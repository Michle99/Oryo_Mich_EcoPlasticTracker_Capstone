import { Request, Response } from 'express';
import PollutionReportModel, { IPollutionReport } from '../models/pollution-report.model';

export const submitPollutionReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, title, description, type, images }: IPollutionReport = req.body;

    // Create a new pollution report
    const newReport: IPollutionReport = new PollutionReportModel({
      location,
      title,
      description,
      type,
      images,
    });

    // Save the report to the database
    await newReport.save();

    res.status(201).json({ message: 'Pollution report submitted successfully' });
  } catch (error) {
    console.error('Error submitting pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPollutionReports = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve all pollution reports from the database
    const reports = await PollutionReportModel.find();

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching pollution reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
