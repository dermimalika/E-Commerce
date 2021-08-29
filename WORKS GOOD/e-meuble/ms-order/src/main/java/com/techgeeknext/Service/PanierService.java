package com.techgeeknext.Service;


import com.netflix.discovery.converters.Auto;
import com.techgeeknext.Exceptions.PanierItemNotExistException;
import com.techgeeknext.dao.PanierRepository;
import com.techgeeknext.dto.Panier.AddToPanierDto;
import com.techgeeknext.dto.Panier.PanierDto;
import com.techgeeknext.dto.Panier.PanierItemDto;
import com.techgeeknext.entities.Panier;
import com.techgeeknext.entities.Product;
import com.techgeeknext.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PanierService {
    @Autowired
    private PanierRepository panierRepository;

    public PanierService(){}

    public PanierService(PanierRepository panierRepository){
        this.panierRepository=panierRepository;
    }

    public void addToPanier(AddToPanierDto addToPanierDto, Product product,User user){
        Panier panier = new Panier(product, addToPanierDto.getQuantity(),user);
        panierRepository.save(panier);
    }


    public PanierDto listPanierItems(User user){
        List<Panier> panierList = panierRepository.findAllByUserOrderByCreatedDateDesc(user);
        List<PanierItemDto> panierItems =  new ArrayList<>();
        for(Panier panier:panierList){
            PanierItemDto panierItemDto = getDtoFromPanier(panier);
            panierItems.add(panierItemDto);
        }
        double totalCost=0;
                for(PanierItemDto panierItemDto:panierItems){
                    totalCost +=(panierItemDto.getProduct().getPrice() * panierItemDto.getQuantity());
                }
                PanierDto panierDto = new PanierDto(panierItems,totalCost);
                return panierDto;
    }

    public static PanierItemDto getDtoFromPanier(Panier panier){
        PanierItemDto panierItemDto = new PanierItemDto(panier);
        return panierItemDto;
    }
    public void updatePanierItem(AddToPanierDto panierDto, User user, Product product){
        Panier panier  = panierRepository.getOne(panierDto.getId());
        panier.setQuantity(panierDto.getQuantity());
        panier.setCreatedDate(new Date());
        panierRepository.save(panier);
    }
    public void deletePanierItem(int id, Long userId) throws PanierItemNotExistException{
        if (!panierRepository.existsById(id))
            throw new PanierItemNotExistException("Panier id is invalid: "+ id);
        panierRepository.deleteById(id);
    }

    public void deletePanierItems(Long userId){
        panierRepository.deleteAll();
    }

    public void deleteUserPanierItems(User user){
        panierRepository.deleteByUser(user);
    }
}
