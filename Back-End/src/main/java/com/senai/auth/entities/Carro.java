package com.senai.auth.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Carro  implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String marca;
	private String modelo;
	private Integer ano;
    @Column(nullable = false)
	private Integer km;
    @Column(nullable = false)
	private Integer mediaKm;
	@Column(nullable = false)
	private String uso;
    @Column(nullable = false)
	private String cambio;
    @Column(nullable = false)
    private String combustivel;
    @Column(nullable = true)
    private Integer calc;

}
