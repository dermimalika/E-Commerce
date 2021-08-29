package com.techgeeknext.dto.Panier;

import javax.validation.constraints.NotNull;

public class AddToPanierDto {
    private Integer id;
    private @NotNull Long productId;
    private @NotNull Integer quantity;

    public AddToPanierDto() {
    }



    @Override
    public String toString() {
        return "PanierDto{" +
                "id=" + id +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ",";
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
