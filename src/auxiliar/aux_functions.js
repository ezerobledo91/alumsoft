export const createPresupuestoItem = (values, data_aberturas, data_perfiles, data_vidrio, data_accesorios, ID, adicional) => {

    if (adicional) {
        const { nombre_adicional, precio_adicional, cantidad_adicional } = adicional
        // Creo un item con todos los datos, el data de las piezas y sus pesos y longitudes el nombre de la abertura, peso total, precio total
        const new_item = {
            _id: ID + 1,
            data: [],
            abertura: nombre_adicional,
            peso_total: 0,
            precio_total: +precio_adicional,
            precio_aluminio: 0,
            precio_accesorios: 0,
            porcentaje_aplicado: 0,
            medidas: {
                alto: 0,
                ancho: 0,
            },
            vidrio: 'Sin Vidrio',
            vidrio_mt: '',
            precio_vidrio: 0,
            cantidad: cantidad_adicional,
            accesorios: [],
            revestimiento_al: 'Sin Revestimiento',
            revestimiento_al_mt: '',
            precio_revestimiento_al: 0,
        }
        return new_item
    }




    const abertura = data_aberturas.find((item) => item._id === values.abertura) // Busco en las aberturas el objeto que corresponde a la seleccion
    const accesorios = abertura?.accesorios
    // ESTANDAR
    if (abertura.tipo === 'estandar') {
        const vidrio = data_vidrio.find((item) => item.nombre === abertura.vidrio_cod)
        const revestimiento_al = data_perfiles.find((item) => item.codigo === +abertura.revestimiento_cod)
        const calculated = abertura.piezas.map(p => {
            return {
                nombre_pieza: p.nombre,
                total_aluminio_long: p.largo, // Math Round para redondear con dos decimales 
                total_aluminio_peso: Math.round(p.peso * p.largo)
            }
        })
        return ({
            _id: ID + 1,
            data: calculated,
            abertura: abertura.nombre,
            peso_total: 0,
            precio_total: abertura.precio_total,
            precio_aluminio: abertura.precio_kg,
            precio_accesorios: abertura.accesorios.map(a => a.precio * a.cantidad).reduce((a, b) => a + b, 0),
            porcentaje_aplicado: abertura.porcentaje,
            medidas: {
                alto: abertura.alto,
                ancho: abertura.ancho,
            },
            vidrio: vidrio ? vidrio.nombre : 'Sin Vidrio',
            vidrio_mt: vidrio ? abertura.vidrio_m2 : '',
            precio_vidrio: vidrio ? abertura.vidrio_m2 * vidrio.precio : 0,
            cantidad: values.cantidad,
            accesorios: accesorios ? accesorios : 'Sin Accesorios',
            revestimiento_al: revestimiento_al ? revestimiento_al.nombre : 'Sin Revestimiento',
            revestimiento_al_mt: revestimiento_al ? abertura.revestimiento_ml : '',
            precio_revestimiento_al: revestimiento_al ? Math.round(abertura.revestimiento_ml * revestimiento_al.peso * abertura.precio_kg * (1 + (abertura.porcentaje / 100)) * 100) / 100 : 0,


        })
    }

    const vidrio = data_vidrio.find((item) => item._id === values.vidrio)
    const revestimiento_al = data_perfiles.find((item) => item._id === values.revestimiento_aluminio)
    const piezas = abertura.piezas  // Guardo las piezas
    const calculated = []


    // PESO TOTAL EN ALUMINIO (NO REVESTIMIENTO)
    let peso_total = 0
    piezas.forEach((element) => {
        const peso_perfil = data_perfiles.find((item) => item._id === element._id).peso // De las piezas correspondientes busco los perfiles y saco el peso
        let longitud_variable = longitud_calculada(values, element)
        peso_total = Math.round((peso_total + (longitud_variable * peso_perfil)) * 100) / 100
        // Guardo en el array calculated todas las piezas con sus medidas y peso correspondientes.
        calculated.push({
            nombre_pieza: element.nombre,
            total_aluminio_long: Math.round(longitud_variable * 100) / 100, // Math Round para redondear con dos decimales 
            total_aluminio_peso: Math.round(longitud_variable * peso_perfil * 100) / 100,
        })
    })

    let precio_accesorios = 0
    if (accesorios) {
        accesorios.forEach(acc => {
            let accesorio = data_accesorios.find((item) => item.nombre === acc.nombre)
            precio_accesorios = precio_accesorios + (accesorio.precio * accesorio_calculado(values, acc))
        })
    }

    const precio_total = Math.round(peso_total * values.precio * (1 + (values.porcentaje / 100)) * 100) / 100

    // Creo un item con todos los datos, el data de las piezas y sus pesos y longitudes el nombre de la abertura, peso total, precio total
    const new_item = {
        _id: ID + 1,
        data: calculated,
        abertura: abertura.nombre,
        peso_total: peso_total,
        precio_total: precio_total,
        precio_aluminio: +values.precio,
        precio_accesorios: precio_accesorios,
        porcentaje_aplicado: +values.porcentaje,
        medidas: {
            alto: +values.alto,
            ancho: +values.ancho,
        },
        vidrio: vidrio ? vidrio.nombre : 'Sin Vidrio',
        vidrio_mt: vidrio ? +values.vidrio_mt2 : '',
        precio_vidrio: vidrio ? +values.vidrio_mt2 * vidrio.precio : 0,
        cantidad: values.cantidad,
        accesorios: accesorios ? accesorios : 'Sin Accesorios',
        revestimiento_al: revestimiento_al ? revestimiento_al.nombre : 'Sin Revestimiento',
        revestimiento_al_mt: revestimiento_al ? +values.r_aluminio_mt : '',
        precio_revestimiento_al: revestimiento_al ? Math.round(+values.r_aluminio_mt * revestimiento_al.peso * values.precio * (1 + (values.porcentaje / 100)) * 100) / 100 : 0,


    }
    return new_item

}

// export const createPresupuestoItemEstandart = (abertura) =>{
//     const new_item = {
//         _id: ID + 1,
//         data: calculated,
//         abertura: abertura.nombre,
//         peso_total: peso_total,
//         precio_total: precio_total,
//         precio_aluminio: +values.precio,
//         precio_accesorios: precio_accesorios,
//         porcentaje_aplicado: +values.porcentaje,
//         medidas: {
//             alto: +values.alto,
//             ancho: +values.ancho,
//         },
//         vidrio: vidrio ? vidrio.nombre : 'Sin Vidrio',
//         vidrio_mt: vidrio ? +values.vidrio_mt2 : '',
//         precio_vidrio: vidrio ? +values.vidrio_mt2 * vidrio.precio : 0,
//         cantidad: values.cantidad,
//         accesorios: accesorios ? accesorios : 'Sin Accesorios',
//         revestimiento_al: revestimiento_al ? revestimiento_al.nombre : 'Sin Revestimiento',
//         revestimiento_al_mt: revestimiento_al ? +values.r_aluminio_mt : '',
//         precio_revestimiento_al: revestimiento_al ? Math.round(+values.r_aluminio_mt * revestimiento_al.peso  * values.precio * (1 + (values.porcentaje / 100)) * 100) / 100 : 0,

//     }
//     return new_item
// }

const longitud_calculada = (values, pieza) => {
    switch (pieza.variable) {
        case 'marco':
            return (values.alto * 2) + (+values.ancho)
        case 'alto':
            return pieza.cortes * (values.alto - pieza.descuento)
        case 'ancho':
            return pieza.cortes * (values.ancho - pieza.descuento)
        case 'fija':
            return pieza.cantidad * pieza.medida
        case 'perimetro':
            return (values.alto * 2 * values.ancho * 2) - (pieza.cortes * pieza.descuento)
        default:
            break;
    }
}

const accesorio_calculado = (values, accesorio) => {
    if (accesorio.colocacion) {
        switch (accesorio.colocacion) {
            case 'alto':
                return values.alto * accesorio.cantidad
            case 'ancho':
                return values.ancho * accesorio.cantidad
            case 'fija':
                return accesorio.cantidad
            case 'perimetro':
                return (values.alto * 2 * values.ancho * 2) * accesorio.cantidad
            default:
                break;
        }
    } else {

        return accesorio.cantidad

    }

}

// RETURN OPTION GROUP TO SELECT IN FORM

export const generateOptionGroups = (originalArray, groupTo, toValue, toShow) => {
    const newArray = [...new Set(originalArray.map((a) => a[groupTo]))].map((groupName) => {
        return {
            [groupTo]: groupName,
            items: originalArray.filter((i) => i[groupTo] === groupName),
        }
    })
    return newArray.map((group, i) => {
        return (
            <optgroup key={i} label={group[groupTo]} style={{ textTransform: 'capitalize' }}>
                {group.items.map((item, index) => (
                    <option key={index} value={item[toValue]}>
                        {item[toShow]}
                    </option>
                ))}
            </optgroup>
        )
    })
}



// INPUTS CONTROLS 
export const controlInputsEmpty = (object, arrayKeys) => {
    for (let index = 0; index < arrayKeys.length; index++) {
        const key = arrayKeys[index];
        if (object[key] === '' || object[key] === undefined || object[key] === null) {
            return 'Falta completar un campo.'
        }
    }

    return false
}