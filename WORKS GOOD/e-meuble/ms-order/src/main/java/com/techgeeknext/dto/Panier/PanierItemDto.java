package com.techgeeknext.dto.Panier;

import com.techgeeknext.entities.Panier;
import com.techgeeknext.entities.Product;

import javax.validation.constraints.NotNull;

public class PanierItemDto {
    private Integer id;
    private @NotNull Long userId;
    private @NotNull Integer quantity;
    private @NotNull Product product;

    public PanierItemDto() {
    }

    public PanierItemDto(Panier panier) {
        this.setId(panier.getId());
        this.setUserId(panier.getUser().getId());
        this.setQuantity(panier.getQuantity());
        this.setProduct(panier.getProduct());
    }

    @Override
    public String toString() {
        return "PanierDto{" +
                "id=" + id +
                ", userId=" + userId +
                ", quantity=" + quantity +
                ", productName=" + product.getName() +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
