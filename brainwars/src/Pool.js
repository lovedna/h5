var Pool = function(){
    //props
    this._lis = [];
    this._index = -1;
    this._curItm;
    
    this.isHaveItem = function(){
        return this._lis.length >0;
    }
    
    this.getItem =  function(){
        var obj;
        if ( this._lis.length > 0 ){
            obj = this._lis.shift();
        } 

        return obj;
			
    }
    
    this.returnItem = function(itm){ 
        
        if(itm){
            for(var i=0; i<this._lis.length; i++){
                var lis_itm = this._lis[i];
                if(lis_itm == itm){
                    console.log("the same item:", itm);
                    return;
                }
            }
            this._lis.push(itm);
        }
    } 
		
	this.clear = function(){
        this._lis.splice(0, this._lis.length);
        this._lis = null;
    }

    this.getItemCount = function(){
        return this._lis.length
    }
    
}



