package shillelaghsrus.security;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import shillelaghsrus.security.jwt.JwtTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	JwtTokenFilter provider;

	@Autowired
	DataSource source;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private shillelaghsrus.security.jwt.JwtConfigurer configurer;

	@Override
	public void configure(HttpSecurity http) throws Exception {

		http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, "/shillelaghs/**").permitAll().and()
				.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll().and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/customers/*").hasAnyAuthority("USER", "ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/customers/name/*").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.POST, "/customers").permitAll().and().authorizeRequests()
				.antMatchers(HttpMethod.POST, "/customers/post-customers").hasAuthority("ADMIN").and()
				.authorizeRequests().antMatchers(HttpMethod.GET, "/orders").hasAuthority("ADMIN").and()
				.authorizeRequests().antMatchers(HttpMethod.GET, "/orders/*").hasAuthority("ADMIN").and()
				.authorizeRequests().antMatchers(HttpMethod.GET, "/orders/customer/*").hasAuthority("USER").and()
				.authorizeRequests().antMatchers(HttpMethod.POST, "/orders/*").hasAuthority("USER").and()
				.authorizeRequests().antMatchers(HttpMethod.DELETE, "/**").hasAuthority("ADMIN").and()
				.authorizeRequests().antMatchers(HttpMethod.PUT, "/**").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.DELETE, "/customers/*").hasAuthority("DEVELOPER").and().authorizeRequests()
				.antMatchers(HttpMethod.POST, "/shillelaghs/**").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.DELETE, "/shillelaghs/**").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/customers").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/customers/**").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/payment/*").hasAuthority("ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.POST, "/payment/*").hasAnyAuthority("USER", "ADMIN").and().authorizeRequests()
				.antMatchers(HttpMethod.DELETE, "/payment/**").hasAnyAuthority("USER", "ADMIN").anyRequest()
				.authenticated().and().csrf().disable().exceptionHandling()
				.authenticationEntryPoint(unauthorizedEntryPoint()).and().apply(configurer);
		;
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		UserDetailsService service = userDetails();
//		auth.jdbcAuthentication().dataSource(s).withUser()
		auth.userDetailsService(service).passwordEncoder(encoder);
	}

	@Bean
	public AuthenticationEntryPoint unauthorizedEntryPoint() {
		return (request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
				"Unauthorized");
	}

	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public UserDetailsService userDetails() {
		return new shillelaghsrus.services.CustomUserDetailsService();
	}

}
