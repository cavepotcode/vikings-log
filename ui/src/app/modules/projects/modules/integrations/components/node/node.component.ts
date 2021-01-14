import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.less']
})
export class NodeComponent implements OnInit {

    public createObject: string;
    public sendInformation: string;
    public concatenate: string;
    constructor() { }

    ngOnInit(): void {
        this.loadExample();
    }
    public loadExample() {
        this.createObject = `
                let data = {
                    message : 'unhandled error',
                    type :'nodejs',
                    info : {
                        message: "Important error"
                    },
                    exception : {
                        code : 500,
                        message : 'message',
                        stack : 'stack'
                    }
                }`

        this.sendInformation = `
                const options = {
                    host: 'localhost',
                    port: 8099,
                    path: '/v1/logs/error',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey':'b136e785-2cd5-48b6-bdd7-012d6af138bb'
                    }
                }
                return new Promise((resolve,rejects) => {
                    const req = http.request(options,res => {
                        res.on('data',d => {
                            process.stdout.write(d)
                            resolve(d)
                        })
                    })
                    req.on('error',error => {
                        console.error(error)
                        rejects(error)
                    })
                    req.write(JSON.stringify(data))
                    req.end()
                })`;
        this.concatenate = this.createObject.toString() + this.sendInformation.toString();
    }
}
