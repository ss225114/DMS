package com.example.Dms.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    ApplicationContext context;

    private HandlerExceptionResolver exceptionResolver;

    @Autowired
	public JwtFilter(HandlerExceptionResolver exceptionResolver) {
		this.exceptionResolver=exceptionResolver;
	}

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // System.out.println(authHeader);

        try
		{
			if (authHeader != null && authHeader.contains("Bearer ") && !authHeader.contains("Bearer null")) {
                token = authHeader.substring(7);
                username = jwtService.extractUsername(token);
            }
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
			{
				UserDetails userDetails=context.getBean(AuthUserDetailsService.class).loadUserByUsername(username);
				if(jwtService.validateToken(token,userDetails))
				{
					UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				}
			}
			filterChain.doFilter(request, response);
		}
		catch(Exception e)
		{
			exceptionResolver.resolveException(request, response, null, e);
		}

        
        
    }

    // private void handleJwtException(HttpServletResponse response, Exception ex, String message) throws IOException {
    //     response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    //     response.setContentType("application/json");
    //     response.getWriter().write("{\"error\": \"" + message + "\", \"message\": \"" + ex.getMessage() + "\"}");
    // }

}
// if (authHeader != null && authHeader.startsWith("Bearer ")) {
//     token = authHeader.substring(7);  // Extract token from Bearer
//     try {
//         username = jwtService.extractUsername(token);  // Extract username from token
//     } catch (ExpiredJwtException ex) {
//         System.out.println("Expired JWT exception caught: " + ex.getMessage());
//         throw ex;  // Explicitly throw the exception to be handled by GlobalExceptionHandler
//     } catch (Exception ex) {
//         // Handle any other exceptions
//         filterChain.doFilter(request, response); // Let the filter chain proceed for other errors
//         return;
//     }
// }

//     if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//         UserDetails userDetails = context.getBean(AuthUserDetailsService.class).loadUserByUsername(username);

//         if (jwtService.validateToken(token, userDetails)) {
//             UsernamePasswordAuthenticationToken authenticationToken =
//                     new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//             authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//             SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//         }
//     }

//     filterChain.doFilter(request, response);