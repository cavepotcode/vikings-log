import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-php',
    templateUrl: './php.component.html',
    styleUrls: ['./php.component.less']
})
export class PhpComponent implements OnInit {


    public createObject: String;
    public sendInformation: String;
    public concatenate: String;


    constructor() { }

    ngOnInit(): void {
        this.loadExample();
    }


    public loadExample() {
        this.createObject = `
                $body =  new Log();
                $body->message = "unhandled error";
                $body->type = "php";
                $body->exception = new LogException();
                $body->exception->code = 500;
                $body->exception->message = "Message";
                $body->exception->stack = "Stack";`;

        this.sendInformation = `
                $payload = json_encode($body);
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type:application/json',
                    'apikey: 676ece7c-f1f6-49c5-ae4c-1dabd5f27c26'
                ));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                $result = curl_exec($ch);
                curl_close($ch); `;

        this.concatenate = this.createObject.toString() +this.sendInformation.toString();

    }


}
