"use strict";   //no idea what this means
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT;
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/movies', (req, res) => {
    res.render('movies');
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port ${port}...`);
});
//# sourceMappingURL=index.js.map