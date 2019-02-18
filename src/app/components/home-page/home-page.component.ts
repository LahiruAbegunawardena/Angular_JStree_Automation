import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  display1: any;

  user = {
    parent_name: 'Root 1',
    node_name: ''
  };

  // parents = ['child 1', 'child 2', 'child1 - child 1'];
  parents = ['child 1', 'child 2', 'child1 - child 1'];

  nodes = [];
  // nodes = [{
  //   name: 'Root 1',
  //   child: [
  //     {
  //       name: 'child 1',
  //       child: [
  //         {
  //           name: 'child1 - child 1',
  //           child: []
  //         }
  //       ]
  //     },
  //     {
  //       name: 'child 2',
  //       child: []
  //     }
  //   ]
  // }];

  constructor() {}

  ngOnInit() {
    this.nodes = [
      {
        _id : '5c358f37ba1eed1bc3531dbf',
        subject_key : 'ant-aal-aepz',
        tags : [],
        tenant_id : 'ant',
        master_type : 'organization',
        master_name : 'ant-aal-aepz-org',
        data : {
          node : {
            gates : {
              k : 'back_qc',
              v : 'Back QC'
            },
            display_name : 'Team01',
            hsk : 'primary',
            filterKey : 'Back QC',
            value : 'station3',
            bctx_ref : [
              'team01'
            ],
            key : 'station_id'
          },
          edge : {
            relation : 'parent',
            key : 'line1',
            value : 'module_id',
            subject : 'ant-aal-aepz-floor1-sewing-section1-line1'
          },
          subject : 'ant-aal-aepz-floor1-sewing-section1-line1-station3'
        },
        doc_id : {},
        datetime : 1526928321353.0
      },
      // {
      //   _id : '987667',
      //   data : {
      //     node : {
      //       display_name : 'Team01345',
      //     }
      //   }
      // }
    ];
    // ---------------------------------------------------------------------------------------------------

    console.log('nodes bfr change : ' + JSON.stringify(this.nodes));
  }

  update1(val) {
    this.user.parent_name = val;
  }
  update2(val) {
    this.user.node_name = val;
  }

  getValue(ch) {
    if (ch.child === []) {
      return ch.name;
    } else if (ch.child !== []) {
      ch.child.forEach(aaa => {
        if (aaa.child === []) {
          return aaa.name;
        } else {
          this.getValue(aaa.child);
        }
      });
    }
  }

  move(ch) {
    if (ch !== []) {
      ch.child.forEach( aaa => {
        if (aaa.child === []) {
          return aaa.name;
        } else {
          this.move(aaa.child);
        }
      });
    } else {
      return ch.name;
    }
  }

  checkIt(d) {
    // method written to run recursively to find matching parent and insert child node
    if (d.name === this.user.parent_name) {
      d.child.push({
        name: this.user.node_name,
        child: []
      });
      console.log('updated nodes, ' + JSON.stringify(this.nodes));
    } else {
      d.child.forEach(e => {
        this.checkIt(e);
      });
    }
  }

  addDta() {
    // user - json to update child according to parent
    console.log('user to use : ' + JSON.stringify(this.user));
    // this.nodes[0].child.forEach(d => {
    //   this.checkIt(d);
    // });
    this.nodes.forEach(aaa => {
      aaa.data.node.display_name = this.user.node_name;
    });
    console.log('nodes after change : ' + JSON.stringify(this.nodes));
    // alert('nodes: ' + JSON.stringify(this.nodes));
    this.parents.push(this.user.node_name);
    this.user.node_name = '';
  }

}
