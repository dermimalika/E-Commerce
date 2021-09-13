package com.techgeeknext.Service;

import com.techgeeknext.Exceptions.OrderNotFoundException;
import com.techgeeknext.dao.OrderRepository;
import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.dto.Order.PlaceOrderDto;
import com.techgeeknext.dto.Panier.PanierDto;
import com.techgeeknext.dto.Panier.PanierItemDto;
import com.techgeeknext.entities.Order;
import com.techgeeknext.entities.OrderItem;
import com.techgeeknext.entities.Product;
import com.techgeeknext.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {
    @Autowired
    private PanierService panierService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    OrderItemsService orderItemsService;
    @Autowired
    ProductRepository productRepository;

    public Order saveOrder(PlaceOrderDto orderDto, User user){
        Order order=getOrderFromDto(orderDto,user);

        return orderRepository.save(order);
    }

    private Order getOrderFromDto(PlaceOrderDto orderDto, User user){
        Order order =new Order(orderDto,user);
        return order;
    }

    public List<Order> listOrders(User user){
        List<Order> orderList = orderRepository.findAllByUserOrderByCreatedDateDesc(user);
        return orderList;
    }
    public Order getOrder(int orderId) throws OrderNotFoundException{
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()){
            return order.get();
        }
        throw new OrderNotFoundException("Order Not Found !");

    }


    public Order placeOrder(User user){
        PanierDto panierDto = panierService.listPanierItems(user);
        PlaceOrderDto placeOrderDto = new PlaceOrderDto();
        placeOrderDto.setUser(user);
        placeOrderDto.setTotalPrice(panierDto.getTotalCost());

        Order newOrder = saveOrder(placeOrderDto,user);
        List<PanierItemDto> panierItemDtoList = panierDto.getPaniertItems();
        for(PanierItemDto panierItemDto: panierItemDtoList) {
            OrderItem orderItem = new OrderItem(
                    newOrder,
                    panierItemDto.getProduct(),
                    panierItemDto.getQuantity() ,
                    panierItemDto.getProduct().getPrice());

            orderItemsService.addOrderedProducts(orderItem);
            panierItemDto.getProduct().setQuantity(panierItemDto.getProduct().getQuantity() - panierItemDto.getQuantity());
         //   product.setQuantity(panierItemDto.getProduct().getQuantity() - panierItemDto.getQuantity());
            productRepository.save(panierItemDto.getProduct());


        }
        panierService.deleteUserPanierItems(user);
        return newOrder;
        }




    }

