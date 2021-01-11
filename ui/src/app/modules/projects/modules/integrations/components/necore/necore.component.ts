import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-necore',
    templateUrl: './necore.component.html',
    styleUrls: ['./necore.component.less']
})
export class NecoreComponent implements OnInit {

    public createObject: string;
    public sendInformation: string;
    public concatenate: string;
    constructor(private clipboard: Clipboard) { }

    ngOnInit(): void {
        this.loadExample();
    }

    public loadExample() {
        this.createObject = `
                Log data =  new Log()
                {
                    message = "unhandled error",
                    type = error,
                    exception = new LogException(){ 
                        code = (int)HttpStatusCode.InternalServerError, 
                        message = error.Error.Message, 
                        stack = error.Error.StackTrace}
                }`

        this.sendInformation = `
                MediaTypeFormatter jsonFormatter = new JsonMediaTypeFormatter();
                HttpContent content = new ObjectContent	<object>(data, jsonFormatter);
                
                using HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Add("apikey","676ece7c-f1f6-49c5-ae4c-1dabd5f27c26");
                using HttpResponseMessage response = client.PostAsync("http://localhost:8099/v1/logs/error").Result;
                string strJson = response.Content.ReadAsStringAsync().Result;
            `;
        this.concatenate = this.createObject.toString() + this.sendInformation.toString();
    }
}
