export const createPresupuestoItem = (values, data_aberturas, data_perfiles, ID) => {
    const abertura = data_aberturas.find((item) => item._id === values.abertura) // Busco en las aberturas el objeto que corresponde a la seleccion
    const piezas = abertura.piezas  // Guardo las piezas
    const calculated = []
    let peso = 0

    piezas.forEach((element) => {
        const peso_perfil = data_perfiles.find((item) => item._id === element.perfil).peso // De las piezas correspondientes busco los perfiles y saco el peso
        peso = peso + (element.constante_m * element.cortes * values[element.variable] * peso_perfil)

        // Guardo en el array calculated todas las piezas con sus medidas y peso correspondientes.
        calculated.push({
            nombre_pieza: element.nombre,
            total_aluminio_long: Math.round(element.constante_m * element.cortes * values[element.variable] * 100) / 100, // Math Round para redondear con dos decimales 
            total_aluminio_peso: Math.round(element.constante_m * element.cortes * values[element.variable] * peso_perfil * 100) / 100,
        })
    })

    // Creo un item con todos los datos, el data de las piezas y sus pesos y longitudes el nombre de la abertura, peso total, precio total
    const new_item = {
        _id: ID + 1,
        data: calculated,
        abertura: abertura.nombre,
        peso_total: Math.round(peso * 100) / 100,
        precio_total: peso * values.precio  * (1+(values.porcentaje/100)),
        medidas: {
            alto: values.alto,
            ancho: values.ancho,
        },
        cantidad: values.cantidad

    }


    return new_item

}

