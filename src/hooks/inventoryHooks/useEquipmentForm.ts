// Este hook personalizado se encarga de manejar el estado del formulario de equipo, 
// incluyendo los campos del formulario y la lógica para resetear el formulario después de agregar o editar un equipo.
import { useState } from "react";

function useEquipmentForm() {
    // Inputs del formulario:
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [status, setStatus] = useState("");
    const [branch, setBranch] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [price, setPrice] = useState("");

    const [editId, setEditId] = useState<string | null>(null); // Guarda qué equipo estamos editando, si es null estamos creando y si tiene id estamos editando 

    const resetForm = () => { // Resetea todos los campos del formulario a sus valores iniciales
        setName("");
        setCategory("");
        setSerialNumber("");
        setStatus("");
        setBranch("");
        setPurchaseDate("");
        setPrice("");
        setEditId(null); // Resetea el editId a null para indicar que ya no estamos editando ningún equipo
    };

    return {
        name,
        setName,

        category,
        setCategory,

        serialNumber,
        setSerialNumber,

        status,
        setStatus,

        branch,
        setBranch,

        purchaseDate,
        setPurchaseDate,

        price,
        setPrice,

        editId,
        setEditId,

        resetForm,
    };
}

export default useEquipmentForm;