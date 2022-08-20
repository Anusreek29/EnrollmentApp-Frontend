import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { jsPDF } from "jspdf";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('tableContent',{static:false}) el!:ElementRef;

  public page: any={};

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getSearchStudents().subscribe((data)=>{
      console.log(data)
      this.page.data=data
    })
  }
  reportGenerate(){
    let pdf = new jsPDF('l','pt',[1400,900]);
  pdf.html(this.el.nativeElement, 
    {
      callback:(pdf)=>{pdf.save("Report.pdf");}
 
    });
  }

}
