class QueryBase
  RelationRequired = Class.new(StandardError)
  QUERY_BENCHMARK_SAMPLER = 7
  INCORRECT_QUERY_RETURN = "#query method should return an object of ActiveRecord::Relation class"
  INCORRECT_ARGUMENT_RELATION = "Query Objects only accept ActiveRecord::Relation in the constructor"
  NO_BASE_RELATION = "Query Objects require a base relation to be defined"
  QUERY_NOT_IMPLEMENTED = "In Query Objects, you need to implement #query method which returns ActiveRecord::Relation object"

  def initialize(*args)
    @options = args.extract_options!.with_indifferent_access
    @relation = args.first || base_relation
    @use_selector = @options.dig(:use_selector).nil? ? true : @options.dig(:use_selector) 
    @offset, @limit = @options.dig(:page_offset) || 0, @options.dig(:page_limit) || 10
    @order_by = @options.dig(:order_by)
    @skip_benchmark = @options.dig(:skip_benchmark)
    @join_table_attrs = @options.dig(:join_table_attrs) || []
    @options = @options.except(
      :use_selector, :page_limit, :page_offset, :order_by, :skip_benchmark, :join_table_attrs
    )

    if relation.nil?
      raise(
        RelationRequired,
        NO_BASE_RELATION
      )
    elsif !relation.is_a?(ActiveRecord::Relation)
      raise(
        RelationRequired,
        INCORRECT_ARGUMENT_RELATION
      )
    end
  end

  def self.call(*args)
    new(*args).call
  end

  def call
    query_result = nil

    query_result = query.tap do |relation|
      unless relation.is_a?(ActiveRecord::Relation)
        raise(
          RelationRequired,
          INCORRECT_QUERY_RETURN
        )
      end
    end
    query_result = selector(query_result) if self.class.private_instance_methods(false).include?(:selector) && use_selector
    query_result = query_result.order(@order_by) if @order_by.present?
    # v1 for QO benchmarking. Will see how this is working and modify accordingly
    query_benchmark = nil
    query_benchmark = Benchmark.measure do
      puts "\n--------------Benchmarking (Only for Measurements)---------------"
      query_result.inspect
      puts "-----------------------------------------------------------------"
    end if run_query_benchmarks?
    show_query_benchmarks(query_benchmark)

    return query_result
  end

  def self.base_query(context)
    self.base_relation = context
  end

  def base_relation
    return nil if self.class.base_relation.nil?

    if self.class.base_relation < QueryBase
      self.class.base_relation.call(options.merge(skip_benchmark: true))
    elsif self.class.base_relation.is_a?(ActiveRecord::Relation)
      self.class.base_relation
    elsif self.class.base_relation < ActiveRecord::Base
      self.class.base_relation.all
    end
  end

  private

  class << self
    attr_accessor :base_relation
  end

  attr_accessor :relation, :options, :use_selector

  def filter_by_options(query_options=options)
    add_joined_table_attributes
    filter_options_by_type(query_options.except(:not), filter_type: :inclusion)
    filter_options_by_type(query_options.dig(:not), filter_type: :exclusion)
    relation
  end

  # @param [Hash] query_options
  # @param [:inclusion, :exclusion] filter_type
  def filter_options_by_type(query_options=options, filter_type: :inclusion)
    return unless query_options.present?

    base_relation = self.class.base_relation
    base_relation = self.class.base_relation.call(skip_benchmark: true) if self.class.base_relation < QueryBase
    
    filters = []
    query_options.each do |option_key, option_value|
      next if relation.nil?

      if base_relation.has_attribute?(option_key.to_s)
        filters << {key: option_key, val: option_value}
      else
        option_key_s, option_key_p = option_key.singularize, option_key.pluralize
        if has_association?(base_relation, option_key_s) || has_association?(base_relation, option_key_p)
          filters << {key: option_key_p, val: option_value}
        else
          next
        end
      end
    end

    filters.each do |filter|
      add_filter(filter_key: filter[:key], filter_value: filter[:val], filter_type: filter_type)
    end
  end

  def add_filter(filter_key:, filter_value:,  filter_type: :inclusion)
    if filter_type.equal?(:inclusion)
      self.relation = relation.where(filter_key.to_sym => filter_value)
    elsif filter_type.equal?(:exclusion)
      self.relation = relation.where.not(filter_key.to_sym => filter_value)
    end
  end

  def add_joined_table_attributes
    @join_table_attrs.each do |option_key, option_value|
      self.relation = relation.where(option_key.to_sym => option_value) 
    end
  end

  def has_association?(base, association)
    base.reflect_on_association(association.to_sym).present?
  end

  def query
    raise(
      MissingImplementationError,
      QUERY_NOT_IMPLEMENTED
    )
  end

  # needs fine tuning
  def show_query_benchmarks(benchmarks)
    return nil unless benchmarks.present?
    query_real_elapsed_time = benchmarks.real * 1000

    if query_real_elapsed_time > 30
      puts "[SLOW QUERY]".yellow + " #{self.class.name} = " + "#{query_real_elapsed_time} ms".red
    else
      puts "[GENERAL QUERY]".light_blue + " #{self.class.name} = " + "#{query_real_elapsed_time} ms".green
    end
    puts "--------------Benchmark done! (Only for Measurements)---------------\n"
  end

  def run_query_benchmarks?
    return false if @skip_benchmark

    true if Rails.env.development? || Rails.env.staging?
    # return (1..10).to_a.sample > QUERY_BENCHMARK_SAMPLER
  end
end
