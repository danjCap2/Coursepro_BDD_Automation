'use strict';

let Helper = codecept_helper;
let I;
const assert = require('assert');
const global = require('../node_modules/.bin/codecept.conf');

class MyHelper extends Helper {

    // add custom methods here
    // If you need to access other helpers
    // use: this.helpers['helperName']



    _init() {
        I = actor();
    };

    fail_test(message) {
        assert.fail(message);
    };

    async match_string_for_assess_pupil(element){
        let match;
        const targetEls = await this.helpers['Puppeteer'].page.$$(element);
        for(let target of targetEls)
        {
            const cell_content = await this.helpers['Puppeteer'].page.evaluate(el => el.innerHTML, target);
            if(cell_content.match('a[id$="assessPupil_"]'))
            {
                let id_for_member ='';
                id_for_member= cell_content.match(/assessPupil_(\d*)/g);
                match = id_for_member[2];
            }
        }
        return match;
    };

    async match_string_for_member_info(element){
        let match1,match2,match3,match4;
        const targetEls = await this.helpers['Puppeteer'].page.$$(element);
        for(let target of targetEls)
        {
            const cell_content = await this.helpers['Puppeteer'].page.evaluate(el => el.innerHTML, target);
            let id_for_member ='';
            id_for_member = cell_content.match(/member_(\d*)/g);
            match1 = id_for_member[1];
            match2 = id_for_member[2];
            match3 = id_for_member[3];
            match4 = id_for_member[4];
        }
        return [match1,match2,match3,match4];
    };

    async match_string_for_alerts(element){
        let match1,match2,string_match1,string_match2;
        const targetEls = await this.helpers['Puppeteer'].page.$$(element);
        for(let target of targetEls)
        {
            const cell_content = await this.helpers['Puppeteer'].page.evaluate(el => el.innerHTML, target);
            I.say(cell_content);
            let alert_for_member ='';
            alert_for_member = cell_content.match(/br>(\w*)/g);
            match1 = alert_for_member[0];
            match2 = alert_for_member[1];
            string_match1 = match1.replace('br>','');
            string_match2 = match2.replace('br>','');

        }
        return [string_match1,string_match2];
    };

    async match_string_for_member_DOB(element){
        let match1,string_match1;
        const targetEls = await this.helpers['Puppeteer'].page.$$(element);
        for(let target of targetEls)
        {
            const cell_content = await this.helpers['Puppeteer'].page.evaluate(el => el.innerHTML, target);
            let alert_for_member ='';
            alert_for_member = cell_content.match(/(\d*)\/(\d*)\/(\d*)/g);
            match1 = alert_for_member[0];
            string_match1 = match1.replace('br>','');
        }
        return [string_match1];
    };

}

module.exports = MyHelper;