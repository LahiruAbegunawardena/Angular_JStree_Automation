import { Component, OnInit } from '@angular/core';
import {NgFlashMessageService} from 'ng-flash-messages';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-org-page',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.css']
})
export class OrgPageComponent implements OnInit {

  keys = ['tenant_id', 'factory_id', 'floor_id', 'dpt_id', 'module_id', 'station_id'];

  data = [];
  enteredOrder = [];
  str = '';
  needyDta = [];
  extraDta = {};
  public count: any = 0;
  user = {
    key: '',
    value: ''
  };

  constructor(private ngFlashMessageService: NgFlashMessageService, public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
  }

  updateIt() {
    // when you add values of parent keys of nearly duplicated node
    console.log('update dta : ', this.extraDta);
    console.log('needy dta : ', this.needyDta);
    this.needyDta = [];

    this.data.forEach(aaa => {
      // this.needyDta.forEach(aab => {
      //   this.updateChild(aab, this.extraDta[aab], aaa);
      // });
      for (let obj in this.extraDta) {
        console.log('obj', obj);
        this.updateChild(obj, this.extraDta[obj], aaa);
      }
    });
  }

  updateChild(ky, val, ab) {
    console.log('ab : ' + JSON.stringify(ab) + ab.child.length);
    if ((ab.key === ky) && (ab.value === '')) {
      ab.value = val;
    } else {
      ab.child.forEach(aab => {
        this.updateChild(ky, val, aab);
      });
    }
  }

  update1(val) {
    this.user.key = val;
  }

  update2(val) {
    this.user.value = val;
  }

  update3(x, val) {
    this.extraDta[x] = val;
  }

  countPosition() {
    let i2 = 1;
    while (i2 < this.keys.length) {
      if (this.keys[i2] === this.user.key) { return i2; }
      i2 = i2 + 1;
    }
  }

  addDta() {
    this.count = 0;
    const stat = true;
    const ky = this.user.key;
    console.log('user : ' + JSON.stringify(this.user));
    // let i = 0;

    if ((this.user.key === '') || (this.user.value === '')) {
      // one or all data failed to enter

      this.ngFlashMessageService.showFlashMessage({
        messages: ['Check entered data..'],
        dismissible: true,
        timeout: 2500,
        type: 'info'
      });

    } else {
      this.count = this.keys.indexOf(this.user.key);
      // this.count = this.countPosition();
      console.log('count to position : ' + this.count);
      if (this.data.length === 0) {
        // initial data entry
        this.data.push(
          { key: ky, value: this.user.value, child: [] }
        );
        this.enteredOrder[0] = this.count;
        console.log('entered order ' + JSON.stringify(this.data));
        console.log('entered data ' + JSON.stringify(this.enteredOrder));

        this.ngFlashMessageService.showFlashMessage({
          messages: ['Data entered..'],
          dismissible: true,
          timeout: 2500,
          type: 'success'
        });

      } else {
        let check = true;
        this.enteredOrder.forEach(aa => {
          if (aa === this.count) {
            check = false;
          }
        });
        if (check === true) {
          this.enteredOrder.forEach(aa => {
            // find out if child node of current node is already added
            if ((aa - 1) === this.count) {
              check = false;
            }
          });

          // if (check === false) {
          if (!check) {

            // parent of current node is already added
            const nw = this.data[0];
            this.data = [];
            this.data.push({
              key: ky,
              value: this.user.value,
              child: [nw]
            });
            this.enteredOrder.push(this.count);
            console.log('entered order ' + JSON.stringify(this.data));
            console.log('entered data ' + JSON.stringify(this.enteredOrder));

            this.ngFlashMessageService.showFlashMessage({
              messages: ['Data entered..'],
              dismissible: true,
              timeout: 2500,
              type: 'success'
            });

          } else if (check === true) {
            let check2 = true;
            this.enteredOrder.forEach(aa => {
              // find out if parent node of current node is already added
              if ((aa + 1) === this.count) {
                check2 = false;
              }
            });
            // if (check2 === false) {
            if (!check2) {
              // alert('you are going to add child of a existing node..');
              this.data.forEach(aaa => {
                this.addChild(aaa);
              });
              this.enteredOrder.push(this.count);
              console.log('entered order ' + JSON.stringify(this.data));
              console.log('entered data ' + JSON.stringify(this.enteredOrder));

              this.ngFlashMessageService.showFlashMessage({
                messages: ['Data entered..'],
                dismissible: true,
                timeout: 2500,
                type: 'success'
              });

            } else if (check2 === true) {

              this.ngFlashMessageService.showFlashMessage({
                messages: ['You need to add parent or child of this node first'],
                dismissible: true,
                timeout: 2500,
                type: 'info'
              });

            }
          }
        } else {
          let demoDta = [];
          this.needyDta = [];

          this.ngFlashMessageService.showFlashMessage({
            messages: ['You have already added it..\nYou need to add extra data that need to add new data' + this.count],
            dismissible: true,
            timeout: 2500,
            type: 'info'
          });

          while (this.count >= 0) {
            // console.log('count', this.keys[this.count]);
            if ((this.keys[this.count] === this.user.key) && demoDta.length === 0) {
              demoDta.push({
                key: this.user.key,
                value: this.user.value,
                child: []
              });
            } else if ((this.keys[this.count] !== this.user.key)) {
              this.needyDta.push(this.keys[this.count]);
              const demoDta1 = demoDta[0];
              demoDta = [];
              demoDta.push({
                key: this.keys[this.count],
                value: '',
                child: [demoDta1]
              });
              // this.ngxSmartModalService.getModal('myModal').open(true);
              console.log('needy data : ' + JSON.stringify(this.needyDta));
            }
            this.count--;
          }
          this.data.push(demoDta[0]);
        }
      }
      console.log('data entered : ' + JSON.stringify(this.data));
    }
  }

  addChild(ab) {
    console.log('ab : ' + JSON.stringify(ab) + ab.child.length);
    if (ab.child.length === 0) {
      ab.child.push({
        key: this.user.key,
        value: this.user.value,
        child: []
      });
    } else {
      // console.log('circulate....');
      ab.child.forEach(aab => {
        this.addChild(aab);
      });
    }
  }

  getRoute(itm) {
    this.str = itm.key;
    if (itm.child.length > 0) {
      itm.child.forEach(aa => {
        this.str = this.str + ' ----> ' + this.getRoute(aa);
      });
    }
    // console.log('str : ' + this.str);
    return this.str;
    // this.str = this.str + ' ---> ' + itm.key;
  }

  getValues(itm) {
    this.str = itm.value;
    if (itm.child.length > 0) {
      itm.child.forEach(aa => {
        this.str = this.str + ' - ' + this.getValues(aa);
      });
    }
    // console.log('str : ' + this.str);
    return this.str;
    // this.str = this.str + ' ---> ' + itm.key;
  }

}
