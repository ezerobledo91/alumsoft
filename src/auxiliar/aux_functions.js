export const createPresupuestoItem = (values, data_aberturas, data_perfiles, data_vidrio, ID) => {
    const abertura = data_aberturas.find((item) => item._id === values.abertura) // Busco en las aberturas el objeto que corresponde a la seleccion
    const vidrio = data_vidrio.find((item) => item._id === values.vidrio)
    const piezas = abertura.piezas  // Guardo las piezas
    const calculated = []

    // PESO TOTAL EN ALUMINIO (NO REVESTIMIENTO)
    let peso_total = 0

    piezas.forEach((element) => {
        const peso_perfil = data_perfiles.find((item) => item._id === element.perfil).peso // De las piezas correspondientes busco los perfiles y saco el peso
        let longitud_variable = longitud_calculada(values, element)
        peso_total = Math.round((peso_total + (longitud_variable * peso_perfil)) * 100) / 100
        // Guardo en el array calculated todas las piezas con sus medidas y peso correspondientes.
        calculated.push({
            nombre_pieza: element.nombre,
            total_aluminio_long: Math.round(longitud_variable * 100) / 100, // Math Round para redondear con dos decimales 
            total_aluminio_peso: Math.round(longitud_variable * peso_perfil * 100) / 100,
        })
    })

    const precio_total = Math.round(peso_total * values.precio * (1 + (values.porcentaje / 100)) *100)/100

    // Creo un item con todos los datos, el data de las piezas y sus pesos y longitudes el nombre de la abertura, peso total, precio total
    const new_item = {
        _id: ID + 1,
        data: calculated,
        abertura: abertura.nombre,
        peso_total: peso_total,
        precio_total: precio_total,
        precio_aluminio: +values.precio,
        porcentaje_aplicado: +values.porcentaje,
        medidas: {
            alto: +values.alto,
            ancho: +values.ancho,
        },
        vidrio: vidrio ? vidrio.nombre : 'Sin Vidrio',
        vidrio_mt: vidrio ? +values.vidrio_mt2 : '',
        precio_vidrio: vidrio ? +values.vidrio_mt2 * vidrio.precio : 0,
        cantidad: values.cantidad

    }
    console.log(new_item)
    return new_item

}



const longitud_calculada = (values, pieza) => {
    switch (pieza.variable) {
        case 'marco':
            return (values.alto * 2) + (+values.ancho)
        case 'alto':
            return pieza.constante_m * pieza.cortes * values.alto
        case 'ancho':
            return pieza.constante_m * pieza.cortes * values.ancho
        case 'fija':
            return pieza.constante_m
        default:
            break;
    }
}
