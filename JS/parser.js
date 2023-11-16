export class Parser {
    labels = {};
    intsructions = [];
    constructor(code)
    {
        if (code !== undefined) this.takeCode(code);
    }
    takeCode(code)
    {
        this.code = code;
    }
    seperate_code()
    {
        let arr = this.code.split('\n');
        arr = arr.filter(function(elem){return elem !== ""});
        
        for (let i = 0; i < arr.length; i++)
        {
            if (arr[i].includes(':'))
            {
                let arr2 = arr[i].split(':');
                arr2[0] = arr2[0].replaceAll(' ', '');
                if (arr2[1] == "")
                    arr.splice(i,1);
                else
                {
                    arr2[1] = arr2[1].trim();
                    arr[i] = arr2[1];
                }
                this.labels[arr2[0]] = i;   
            }

            let index = arr[i].indexOf(' ');
            let command = arr[i].slice(0, index);
            let rest = arr[i].slice(index);
            rest.replaceAll(' ', '');
            let registers = rest.split(',');
            instructions.push([command, ...registers]);
        }
    }
}