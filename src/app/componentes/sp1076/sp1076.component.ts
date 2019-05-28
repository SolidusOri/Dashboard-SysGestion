import { Component, OnInit } from '@angular/core';
import { ConsultasSPService } from '../../servicios/consultasSP.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ItemSP1076Interface } from '../../modelos/itemSP1076.interface';

declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-sp1076',
  templateUrl: './sp1076.component.html',
  styleUrls: ['./sp1076.component.css']
})
export class Sp1076Component implements OnInit {

  tamano:number = 10;
  vendedores = [{ve_codven:0, ve_nomven:'Todos'}];
  locales = [{lc_codloc:0, lc_nomloc:'Todos'}];
  dataSP = [];
  montoCre:number[] = [];
  montoVta:number[] = [];
  meses = [];
  mesPorComparar : ItemSP1076Interface = {};

  inicio:string;
  termino:string;
  vendedor:number;
  local:number;

  constructor(private serConsulta: ConsultasSPService) { }

  ngOnInit() {
    /* carga tablas vendedores y locales */
    this.serConsulta.consultaTablas().subscribe(data => {
      
      /* recorro el arreglo de vendedores que viene de data y por cada elemento lo agrego al array de la vista */
      data['vendedores'].map(elem => this.vendedores.push(elem));
      data['locales'].map(elem => this.locales.push(elem));

      console.log(this.vendedores);
      console.log(this.locales);
      
    });
  }

  /* reset(){

    this.dataSP = [];
    this.montoCre = [];
    this.montoVta = [];
    this.meses = [];

  } */

  cargarGrafico(){

    this.inicio = $( "#inicio" ).val();
    this.termino = $( "#termino" ).val();
    this.vendedor = $( "#vendedor" ).val();
    this.local = $("#local").val();
    

    this.serConsulta.consultaSP1076(this.inicio, this.termino, this.vendedor, this.local).subscribe(data => {

      /* lleno data con lo que me devuelve el SP */
      this.dataSP = data;

      /* da vuelta el arreglo */
      this.dataSP.reverse();
      /* elimina el ultimo elemento y lo retorna */
      this.mesPorComparar = this.dataSP.pop();
      /* volvemos a dar vuelta el arreglo */
      this.dataSP.reverse();

      console.log(this.dataSP);

      this.dataSP.map(elem => {

        let periodo = '';

        switch (elem.TM_MESPER) {
          case 1: periodo = 'Enero '+elem.TM_ANOPER; break;
          case 2: periodo = 'Febrero '+elem.TM_ANOPER; break;
          case 3: periodo = 'Marzo '+elem.TM_ANOPER; break;
          case 4: periodo = 'Abril '+elem.TM_ANOPER; break;
          case 5: periodo = 'Mayo '+elem.TM_ANOPER; break;
          case 6: periodo = 'Junio '+elem.TM_ANOPER; break;
          case 7: periodo = 'Julio '+elem.TM_ANOPER; break;
          case 8: periodo = 'Agosto '+elem.TM_ANOPER; break;
          case 9: periodo = 'Septiembre '+elem.TM_ANOPER; break;
          case 10: periodo = 'Octubre '+elem.TM_ANOPER; break;
          case 11: periodo = 'Noviembre '+elem.TM_ANOPER; break;
          case 12: periodo = 'Diciembre '+elem.TM_ANOPER; break;
        }

        this.meses.push(periodo);
        //this.anios.push(elem.TM_ANOPER);
        this.montoCre.push(elem.TM_MTOCRE);
        this.montoVta.push(elem.TM_MTOVTA);
      });

      /* le pone el ano a cada mes del arreglo meses */
      /* for(let i = 0; i < this.dataSP.length; i++){
        this.meses[i] = this.meses[i] + " " + this.dataSP[i].TM_ANOPER;
      } */
      
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  
  public barChartLabels: Label[] = this.meses;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { borderWidth: 2, data: this.montoCre, label: 'Monto Credito' },
    { borderWidth: 2, data: this.montoVta, label: 'Monto Venta' }
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
