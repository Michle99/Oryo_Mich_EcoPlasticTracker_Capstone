"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./db/index"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const pollution_report_routes_1 = __importDefault(require("./routes/pollution-report.routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(body_parser_1.default.json({ limit: '10mb' }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));
// MongoDB Connection
(0, index_1.default)();
// Auth Routes
app.use('/api/auth', auth_routes_1.default);
app.options('/api/reports/submit', (0, cors_1.default)()); // Enable preflight for /api/reports/submit
// Pollution Report Routes
app.use('/api/reports', pollution_report_routes_1.default);
// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
