package com.techgeeknext.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="ms-order")
public interface DeliveryEtatProxy
{

    @PostMapping("/order/noDelivery")
    public void noDelivery(@RequestParam Integer order_id);

    @PostMapping("/order/delivered")
    public void delivered(@RequestParam  Integer order_id);
}
