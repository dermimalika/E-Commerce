package com.techgeeknext.Exceptions;

public class ProductNotExistException extends IllegalArgumentException
{
    public ProductNotExistException(String msg){
        super(msg);
    }
}
