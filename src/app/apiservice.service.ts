import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Importa esto


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  addPedido(data:any): boolean {
    const id = `pedido_${Date.now()}`;
    data.id = id;

    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidos.push(data);

    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    return true;
  }

  getPedidos(): any {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

    pedidos.forEach((item:any) => {
      let sub = 0;
      if(item.pina) sub += 10;
      if(item.champi) sub += 10;
      if(item.jamon) sub += 10;
      if(item.tamanio == 'chica') sub += 40;
      if(item.tamanio == 'mediana') sub += 80;
      if(item.tamanio == 'grande') sub += 120;
      item.subtotal = sub * item.cantidad;
    });
    return pedidos;
  }

  deletePedidos(data:any): any {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    let pedidos_no_del: any[] = [];
    pedidos.forEach((item:any) => {
      // console.log(data.selected + ' ' +item.id)
      if(data.selected !== item.id)
        pedidos_no_del.push(item);
    });

    localStorage.setItem('pedidos', JSON.stringify(pedidos_no_del));
  }

  terminarPedido(data:any): any{
    const id = `compra_${Date.now()}`;

    let total = 0;
    let total_nombre : any[] = [];
    data.forEach((item:any) => {
      // console.log(item.subtotal + ' ' +item.id)
      total += item.subtotal;
      let nombre = item.nombre;
      let sub = item.subtotal;
      let fecha = item.fecha;
      total_nombre.push({nombre, sub, fecha})
    });

    const compras = JSON.parse(localStorage.getItem('compras') || '[]');
    compras.push({ id, total, total_nombre, items: data });

    localStorage.setItem('compras', JSON.stringify(compras));
    localStorage.removeItem('pedidos');

    return true
  }



  recuperarCompras_dia(fecha:any):any{
    const compras = JSON.parse(localStorage.getItem('compras') || '[]');
    console.log(compras)

    const subtotalPorNombreArray: { nombre: string; sub: number }[] = [];


    let fechaHoy
    if(fecha == null){
      fechaHoy = new Date().toISOString().split('T')[0];
    }
    else {
      fechaHoy = fecha
    }

    let total_total = 0;
    compras.forEach((item: any) => {
      item.total_nombre.forEach((nombreItem: any) => {
        // console.log(item.id)
        console.log('nombreItem.fecha')
        console.log(nombreItem.fecha)
        console.log('fechaHoy')
        console.log(fechaHoy)
        if (nombreItem.fecha === fechaHoy) {
          total_total += nombreItem.sub;
          const existingEntry = subtotalPorNombreArray.find(entry => entry.nombre === nombreItem.nombre);

          if (existingEntry) {
              existingEntry.sub += nombreItem.sub;
          } else {
              subtotalPorNombreArray.push({ nombre: nombreItem.nombre, sub: nombreItem.sub });
          }
        }
      });
    });
    return {subtotalPorNombreArray, total_total};
  }


  recuperarCompras_mes(fecha:any):any{
    const compras = JSON.parse(localStorage.getItem('compras') || '[]');
    console.log(compras)

    const subtotalPorNombreArray: { nombre: string; sub: number }[] = [];

    let mes
    if (fecha == null){
      mes = String(new Date().getMonth() + 1)
    }
    else mes = fecha ;


    console.log('mes:')
    console.log(mes)

    let total_total = 0;
    compras.forEach((item: any) => {
      item.total_nombre.forEach((nombreItem: any) => {
        const añoMesItem = nombreItem.fecha.slice(5, 7);
        console.log('añoMesItem:')
        console.log(añoMesItem)
        if (añoMesItem === mes) {
          total_total += nombreItem.sub;
          const existingEntry = subtotalPorNombreArray.find(entry => entry.nombre === nombreItem.nombre);

          if (existingEntry) {
              existingEntry.sub += nombreItem.sub;
          } else {
              subtotalPorNombreArray.push({ nombre: nombreItem.nombre, sub: nombreItem.sub });
          }
        }
      });
    });
    return {subtotalPorNombreArray, total_total};
  }

  // recuperarCompras_dia():any{
  //   const compras = JSON.parse(localStorage.getItem('compras') || '[]');
  //   console.log(compras)

  //   const subtotalPorNombreArray: { nombre: string; sub: number }[] = [];

  //   const fechaHoy = new Date().toISOString().split('T')[0];
  //   let total_total = 0;
  //   compras.forEach((item: any) => {
  //     item.total_nombre.forEach((nombreItem: any) => {
  //       // console.log(item.id)
  //       console.log('nombreItem.fecha')
  //       console.log(nombreItem.fecha)
  //       console.log('fechaHoy')
  //       console.log(fechaHoy)
  //       if (nombreItem.fecha === fechaHoy) {
  //         total_total += nombreItem.sub;
  //         const existingEntry = subtotalPorNombreArray.find(entry => entry.nombre === nombreItem.nombre);

  //         if (existingEntry) {
  //             existingEntry.sub += nombreItem.sub;
  //         } else {
  //             subtotalPorNombreArray.push({ nombre: nombreItem.nombre, sub: nombreItem.sub });
  //         }
  //       }
  //     });
  //   });
  //   return {subtotalPorNombreArray, total_total};
  // }


  // recuperarCompras_mes():any{
  //   const compras = JSON.parse(localStorage.getItem('compras') || '[]');
  //   console.log(compras)

  //   const subtotalPorNombreArray: { nombre: string; sub: number }[] = [];

  //   const mes = String(new Date().getMonth() + 1)
  //   console.log('mes:')
  //   console.log(mes)

  //   let total_total = 0;
  //   compras.forEach((item: any) => {
  //     item.total_nombre.forEach((nombreItem: any) => {
  //       const añoMesItem = nombreItem.fecha.slice(5, 7);
  //       console.log('añoMesItem:')
  //       console.log(añoMesItem)
  //       if (añoMesItem === mes) {
  //         total_total += nombreItem.sub;
  //         const existingEntry = subtotalPorNombreArray.find(entry => entry.nombre === nombreItem.nombre);

  //         if (existingEntry) {
  //             existingEntry.sub += nombreItem.sub;
  //         } else {
  //             subtotalPorNombreArray.push({ nombre: nombreItem.nombre, sub: nombreItem.sub });
  //         }
  //       }
  //     });
  //   });
  //   return {subtotalPorNombreArray, total_total};
  // }

}
