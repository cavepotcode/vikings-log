import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-integration-code',
    templateUrl: './integration-code.component.html',
    styleUrls: ['./integration-code.component.less']
})
export class IntegrationCodeComponent implements OnInit {

    @Input() public name: string;
    public concatenate: string;
    public url = new URL(`${environment.apiUrl}logs/error`);
    public net: string;
    public php: string;
    public node: string;

    constructor(private clipboard: Clipboard) {
    }

    ngOnInit(): void {
        this.loadCode();
    }

    loadCode() {
        this.net = 
        `
        Log data = new Log()
        {
            message = "unhandled error",
            type =  error,
            exception = new LogException(){ 
                code = (int)HttpStatusCode.InternalServerError, 
                message = error.Error.Message, 
                stack = error.Error.StackTrace
            }
        }
        
        MediaTypeFormatter jsonFormatter = new JsonMediaTypeFormatter();
        HttpContent content = new ObjectContentobject>(data, jsonFormatter);
        
        using HttpClient client = new HttpClient();
        client.DefaultRequestHeaders.Add("apikey","***");
        using HttpResponseMessage response = client.PostAsync(${this.url},content).Result;
        string strJson = response.Content.ReadAsStringAsync().Result;
        `;
        this.php = 
        `
            $body =  new Log();
            $body->message = "unhandled error";
            $body->type = "php";
            $body->exception = new LogException();
            $body->exception->code = 500;
            $body->exception->message = "Message";
            $body->exception->stack ="Stack";

            $url = "${this.url}"
            $payload = json_encode($body);
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POST,1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type:application/json',
                'apikey: ***'
            ));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $result = curl_exec($ch);
            curl_close($ch); 
        `;

        this.node = 
        `
        let  data = {
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
        }

        const options = {
            host: '${this.url.hostname}',
            port: ${this.url.port},
            path: '${this.url.pathname}',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey':'***'
            }
        }
    
        return new Promise((resolve,rejects) => {
            const req = http.request(options,res  => {
                res.on('data',d => {
                    process.stdout.write(d)
                    resolve(d)
                })
                req.on('error',error => {
                    console.error(error)
                    rejects(error)
                })
                req.write(JSON.stringify(data))
                req.end()
        })
        `;
    }
    copyCode(){
        if(this.name === 'net'){
            return this.net;
        }
        if(this.name === 'php'){
            return this.php;
        }
        if(this.name === 'node'){
            return this.node;
        }
    }

}
