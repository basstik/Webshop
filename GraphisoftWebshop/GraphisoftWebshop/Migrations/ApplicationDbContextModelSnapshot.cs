﻿// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

// <auto-generated />
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace Quick_Application1.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DAL.Models.Product", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("Category");

                b.Property<string>("Name")
                    .HasMaxLength(100);

                b.Property<string>("Description")
                    .HasMaxLength(500);

                b.Property<int>("Price");

                b.Property<string>("CreatedBy")
                    .HasMaxLength(100);

                b.Property<string>("Email")
                    .HasMaxLength(100);

                b.Property<DateTime>("CreatedDate");

                b.HasKey("Id");

                b.HasIndex("Name");

                b.ToTable("WebshopProducts");
            });
        }
    }
}
