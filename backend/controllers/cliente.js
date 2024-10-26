const { response } = require('express');
const Cliente = require('./../models/cliente');
const { ObjectId } = require('mongodb');

class ControladorCliente {

    static agregar(req, res) {
        console.log("Entro al controlador de agregar cliente\n\n");

        console.log(req.body);
        console.log(req.user_id);

        const { nombre, correo, contacto, organizacion, proyecto } = req.body;
        const user_id = req.user_id;

        const cliente = new Cliente({
            user_id, nombre, correo, contacto, organizacion, proyecto
        });

        console.log(cliente);

        cliente.save()
            .then(clienteNuevo => {
                console.log("Cliente guardado correctamente");
                res.status(200).json({ clienteNuevo});
            }).catch(error => {
                console.error(error);
                res.status(500).send('Error al agregar cliente');
            })
    }

    static listar(req, res) {
        console.log("Entro al controlador de listar clientes");
        console.log(req.user_id);
        Cliente.find({ user_id: req.user_id })
            .then(listaDeClientes => {
                console.log('Se recupero la lista de clientes');

                const clientes = listaDeClientes.map(cliente => cliente);
                res.status(200).json(clientes);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error al recuperar la lista de clientes'); // Enviar un mensaje de error en caso de fallo
            });
    }

    static mostrar(req, res) {
        console.log("Entro al controlador de mostrar cliente");
        console.log(req.params)

        Cliente.find({ _id: req.params.cliente_id})
            .then(resultado => {
                console.log('Registros encontrados:');
                console.log(resultado);
                res.status(200).json(resultado);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error al buscar registros');
            });
    }
 
    static editar(req, res) {
        console.log("Entro al controlador de editar cliente");
        console.log(req.body);
        console.log(req.params);

        Cliente.updateOne({ _id: new ObjectId(req.params.id)}, { $set: req.body })
            .then(resultado => {
                console.log('Registro Editado Exitosamente');
                console.log(resultado);
                res.status(200).json(resultado);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error al editar Registro');
            });
    }

    static cambiarImagen(req, res) {
        console.log("Entro al controlador de cambiar imagen de cliente");
        console.log(req.user);
        console.log(req.body);
        console.log(req.params);

        Cliente.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { imagen: req.body.imagen } })
            .then(resultado => {
                console.log('Imagen Cambiada Exitosamente');
                console.log(resultado);
                res.status(200).json(resultado);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error al cambiar imagen');
            });
    }
}

module.exports = ControladorCliente;