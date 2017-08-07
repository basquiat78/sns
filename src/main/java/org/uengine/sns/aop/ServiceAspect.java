package org.uengine.sns.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

/**
 * Created by uEngine on 2017-07-25.
 */
@Aspect
@Configuration
@EnableAspectJAutoProxy
@Component("serviceAspect")
public class ServiceAspect {

    /**
     * @param joinPoint
     * @return Object
     * @throws Throwable
     */
    @Around("execution(* org.uengine.sns.chat.follower.service.ChatFollowerService.*(..))")
    public Object aroundChatFollowerService(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("ok aspect.....");
        return joinPoint.proceed();
    }

}
