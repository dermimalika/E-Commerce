package com.techgeeknext.dto.Panier;

import java.util.List;

public class PanierDto {
    private List<PanierItemDto> panierItems;
    private double totalCost;

    public PanierDto(List<PanierItemDto> panierItemDtoList, double totalCost) {
        this.panierItems = panierItemDtoList;
        this.totalCost = totalCost;
    }

    public List<PanierItemDto> getPaniertItems() {
        return panierItems;
    }

    public void setPanierItems(List<PanierItemDto> cartItemDtoList) {
        this.panierItems = cartItemDtoList;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(int totalCost) {
        this.totalCost = totalCost;
    }
}
