import { Component, OnInit } from '@angular/core';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-js-tree-gen',
  templateUrl: './js-tree-gen.component.html',
  styleUrls: ['./js-tree-gen.component.css']
})
export class JsTreeGenComponent implements OnInit {

  keys = ['tenant_id', 'factory_id', 'floor_id', 'dpt_id', 'module_id', 'station_id'];
  user = { key: '', value: '' };
  ableAddDta = false;

  myTree = [
    {
      name: 'Apple',
      id: 1,
      options: {
        hidden: false,
        position: 1,
        href: 'https://github.com/Zicrael/ngx-tree-dnd'
      },
      childrens: [
        {
          name: 'Iphone',
          id: 2,
          childrens: [
            {
              name: 'Iphone child',
              id: 21,
              childrens: []
            }
          ]
        }
      ]
    },
    {
      name: 'Google',
      id: 3,
      childrens: [
        {
          name: 'Google play',
          id: 4,
          childrens: []
        }
      ]
    }
  ];

  config =  {
    showActionButtons: true, // show/hide action buttons for all elements
    showAddButtons: true, // show/hide add button for all elements
    showRenameButtons: true, // show/hide rename buttons for all elements
    showDeleteButtons: true, // show/hide delete buttons for all elements
    showRootActionButtons: true, // shlow/hide root action bottons
    enableExpandButtons: true, // // show/hide expand buttons for all elements
    enableDragging: true, // enable/disable dragging
    rootTitle: 'Root',      // Tree title name
    validationText: 'Enter valid name', // form validation text
    minCharacterLength: 1, // minimum valid chars
    setItemsAsLinks: false, // set tree as <a> link-items, use 'href' option for set link.
    setFontSize: 16, // font-size of items in tree.
    setIconSize: 14 // font-size of font-awesome icons inside buttons.
  };

  currentEvent: string = 'start do something';

  extraDta = { tenant_id: '' };        // extra data to be added when duplication needed to be added
  count: any = 0;       // to count priority of keys
  str = '';
  public needyDta = []; // extra data to be added when duplication needed to be added

  constructor(private ngFlashMessageService: NgFlashMessageService) { }

  DtaSet = [];          // data set array
  ngOnInit() {
  }

  onDragStart(event) {
    this.currentEvent = ' on drag start';
  }
  onDrop(event) {
    this.currentEvent = 'on drop';
  }
  onAllowDrop(event) {
    this.currentEvent = 'on allow drop';
  }
  onDragEnter(event) {
    this.currentEvent = 'on drag enter';
  }
  onDragLeave(event) {
    this.currentEvent = 'on drag leave';
  }
  onAddItem(event) {
    this.currentEvent = 'on add item';
    console.log(event);
  }
  onStartRenameItem(event) {
    this.currentEvent = 'on start edit item';
  }
  onFinishRenameItem(event) {
    this.currentEvent = 'on finish edit item';
  }
  onStartDeleteItem(event) {
    console.log('start delete');
    this.currentEvent = 'on start delete item';
  }
  onFinishDeleteItem(event) {
    console.log('finish delete');
    this.currentEvent = 'on finish delete item';
  }
  onCancelDeleteItem(event) {
    console.log('cancel delete');
    this.currentEvent = 'on cancel delete item';
  }

  update1(val) { this.user.key = val; }

  update2(val) { this.user.value = val; }

  update3(x, val) {
    this.extraDta[x] = val;
  }

  updateAddedDta() {
    console.log('extra data : ' + JSON.stringify(this.extraDta));
    this.needyDta = [];
    const abbc = new TreeNode('tenant_id', this.extraDta.tenant_id, 0, this.needyDta);
    let i = 0;
    for (const obj in this.extraDta) {
      console.log('obj: ' + obj);
      if (obj !== 'tenant_id') {
        abbc.addData(obj, this.extraDta[obj], i);
      }
      i = i + 1;
    }
    i = 0;
    this.DtaSet.push( abbc );
    console.log('Data added finally 2222: ', this.DtaSet);
    this.ableAddDta = false;
  }

  getValues(itm) {
    this.str = itm.value;
    if (itm.child.length > 0) {
      itm.child.forEach(aa => {
        this.str = this.str + ' - ' + this.getValues(aa);
      });
    }
    return this.str;
  }

  addDta() {
    this.count = 0;
    const stat = true;
    const ky = this.user.key;
    console.log('user : ' + JSON.stringify(this.user));
    // let i = 0;

    if ((this.user.key === '') || (this.user.value === '')) {
      // one or all data failed to enter through form
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Check entered data..'], dismissible: true, timeout: 2500, type: 'info'
      });

    } else {
      this.count = this.keys.indexOf(this.user.key);
      // this.count = this.countPosition();
      console.log('count to position : ' + this.count);
      if (this.DtaSet.length === 0) {
        // initial data entry
        const node = new TreeNode(this.user.key, this.user.value, this.count, this.needyDta);
        this.DtaSet[0] = node;
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Data entered..'],
          dismissible: true,
          timeout: 2500,
          type: 'success'
        });
      } else if (this.DtaSet.length !== 0) {
        this.DtaSet.forEach(aa => {
          aa.addData(this.user.key, this.user.value, this.count);
          // aa.printData();
          this.needyDta = aa.needyData;
          console.log('needydta: ' + this.needyDta);
          console.log('Data added finally: ', this.DtaSet);
        });
      }
    }
  }
}

class TreeNode {
  keys = ['tenant_id', 'factory_id', 'floor_id', 'dpt_id', 'module_id', 'station_id'];
  enteredOrder = [];  // priority of already entered data
  // dataset: any;       // data set already added from main class
  ky: '';
  val: '';
  Data = [];          // data in current node (this is having all data current tree node has got)
  checkSta: any;      //
  needyData = [];     // extra data to be added when duplication needed to be added from main class

  // constructor(keyval, val, cont, Dtaset, ndyDta) {
  constructor(keyval, val, cont, ndyDta) {
    this.ky = keyval;
    this.val = val;
    // this.dataset = Dtaset;
    this.needyData = ndyDta;
    this.enteredOrder.push(cont);

    // console.log('entered order ' + keyval + '\nvalue: ' + val + '\ncount: ' + cont);
    console.log('enteredOrder : ' + JSON.stringify(this.enteredOrder));

    this.Data.push({
      key: keyval,
      value: val,
      child: []
    });
    this.printData();
  }

  addData(ky, val, count) {
    console.log('enteredOrder : ' + JSON.stringify(this.enteredOrder));
    this.checkIfentered(count);
    if (this.checkSta === 1) {
      console.log('this data added already');
      let i = 0;
      while (i <= count) {
        this.needyData.push(this.keys[i]);
        i++;
      }
      // this.dataset.push(new TreeNode(ky, val, count, this.dataset, this.needyData));
    } else if (this.checkSta === 2) {
      console.log('Child of this data added already');
      const nw = this.Data[0];
      this.Data = [];
      this.Data.push({
        key: ky,
        value: val,
        child: [nw]
      });
      this.enteredOrder.push(count);
    } else if (this.checkSta === 3) {
      console.log('Parent of this data added already');
      this.Data.forEach(aaa => {
        this.addChild(aaa, ky, val);
      });
      this.enteredOrder.push(count);
    } else if (this.checkSta === 0) {
      console.log('There is no this one or its parent or child');
    }
    this.printData();
  }

  printData() {
    console.log('data : ' + JSON.stringify(this.Data));
  }

  addChild(ab, ky, val) {
    console.log('ab : ' + JSON.stringify(ab));
    if (ab.child.length === 0) {
      ab.child.push({
        key: ky,
        value: val,
        child: []
      });
    } else {
      // console.log('circulate....');
      ab.child.forEach(aab => {
        this.addChild(aab, ky, val);
      });
    }
  }

  checkIfentered(count) {
    let chk = true;
    let chk2 = true;
    this.enteredOrder.forEach(aa => {
      if (aa === count) {
        // if data added already
        alert('This is already added');
        chk = false;
        this.checkSta = 1;
      }
    });
    if (chk) {
      // chk == true; that data didn't added
      this.enteredOrder.forEach(aa => {
        console.log('aa: ' + aa);
        if ((aa - 1) === count) {
          alert('Child of this is already added');
          // if child of this is already added
          chk = false;
          chk2 = false;
          this.checkSta = 2;
        }
        if (chk && ((aa + 1) === count)) {
          alert('Parent of this is already added');
          // if parent of this node added already
          chk = false;
          chk2 = false;
          this.checkSta = 3;
        }
      });
    }

    if (chk && chk2) {
      // neither this data nor parent or child added
      this.checkSta = 0;
      alert('Neither this data nor parent or child of this is added');

    }
    console.log('check stat : ' + this.checkSta);
  }


}
