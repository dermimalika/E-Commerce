package com.techgeeknext.Exceptions;

public class OrderNotFoundException extends IllegalArgumentException{
    public OrderNotFoundException(String msg){
        super(msg);
    }
}
