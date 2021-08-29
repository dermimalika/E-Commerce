package com.techgeeknext.Exceptions;

public class PanierItemNotExistException extends IllegalArgumentException{
    public PanierItemNotExistException(String msg){
        super(msg);
    }
}
