import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from 'gsap'
import { ScrollSmoother, ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText)
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  constructor(
    @Inject(PLATFORM_ID) private platFormId: Object
  ){}

  @ViewChild('hello') hello!: ElementRef;
  @ViewChild('hello0') hello0!: ElementRef;
  @ViewChild('world0') world0!: ElementRef;
  @ViewChild('line') line !: ElementRef;
  @ViewChild('boxes') boxes !: ElementRef;
  @ViewChild('btn') btn !: ElementRef;
  @ViewChild('down') down !: ElementRef;
  texteAnimation(classe:string){
    let split = SplitText.create(classe, {
      type:"chars, words, lines"  
    })
    gsap.from(split.chars,{
      y:100,
      autoAlpha:0,
      stagger:{
        amount:0.5,
        from:"random"
      },
      scrollTrigger:{
        trigger: classe,
        start:"center 85%",
        end:"top 70%",
        scrub:1
      }
    })
  }
  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platFormId)){
      let smoother =  ScrollSmoother.create({
        wrapper:"#wrapper",
        content:"#content",
        effects: true,
      })

      smoother.effects("img",{speed:"auto"})

    const spans = this.hello.nativeElement.querySelectorAll('span')
    gsap.set(spans, {opacity: 0, y:20 });
    smoother.paused(true)
    document.body.classList.add('no-scroll')
    let t1 = gsap.timeline({
      onComplete: () => {
        // Réactiver le scroll après l'animation
        document.body.classList.remove('no-scroll');
        smoother.paused(false)
      }
    });
    t1.to(this.line.nativeElement,{
        duration:.5,
        height:"100%",
    })
    t1.to(this.line.nativeElement,{
      width:"100%",
    })
    t1.to(this.hello0.nativeElement,{
      duration:.5,
      marginTop:0,
      opacity:1,
      color:"#fdbc00"
    })
    t1.to(this.world0.nativeElement,{
      duration:.5,
      marginTop:0,
      opacity:1
    })
    gsap.set(this.btn.nativeElement,{y:100})
    t1.to(this.btn.nativeElement,{
      duration:.5,
      opacity:1,
      y:0
    })

    gsap.set(this.down.nativeElement,{y:-500})
    t1.to(this.down.nativeElement,{
      duration:.5,
      opacity:1,
      y:0
    })

    gsap.timeline().to(spans, {
      y:0,
      opacity:1,
      stagger: 1,
      duration: 3,
      ease: "back",
      scrollTrigger:{
        trigger:spans,
        start:"center 65%",
        end:"top 50%",
        scrub:1,
      }
    })

      // let split = SplitText.create('.texte4', {
      //   type:"chars"  
      // })
      // gsap.from(split.chars,{
      //   y:100,
      //   autoAlpha:0,
      //   duration:1,
      //   stagger:{
      //     amount:0.5,
      //     from:"random"
      //   },
      //   scrollTrigger:{
      //     trigger: ".texte4",
      //     start:"center 70%",
      //     end:"top 50%",
      //     scrub:1,
      //   }
      // })
      this.texteAnimation('.texte')
      this.texteAnimation('.texte2')
      this.texteAnimation('.texte3')
     
    }
  }
  title = 'HELLO';
}
