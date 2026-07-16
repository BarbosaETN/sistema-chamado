import Controller from "./Controller.js";
import CategoriaService from "../services/CategoriaService.js";

class CategoriaController extends Controller {
    constructor() {
        super(new CategoriaService());
    }
}

export default CategoriaController;